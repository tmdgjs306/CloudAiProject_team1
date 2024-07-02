import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import ElementNotVisibleException, StaleElementReferenceException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# 링크 수집 클래스 정의
class CollectLinks:
    def __init__(self, no_gui=False, proxy=None):
        chrome_options = Options()
        chrome_options.add_argument('--no-sandbox')  # 사용자 쿠키를 유지하기 위함
        chrome_options.add_argument('--disable-dev-shm-usage')
        if no_gui:
            chrome_options.add_argument('--headless')  # GUI 없이 실행
        if proxy:
            chrome_options.add_argument("--proxy-server={}".format(proxy))  # 프록시 설정
        self.browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

        browser_version = 'Failed to detect version'
        chromedriver_version = 'Failed to detect version'
        major_version_different = False

        # 브라우저와 크롬 드라이버의 버전 확인
        if 'browserVersion' in self.browser.capabilities:
            browser_version = str(self.browser.capabilities['browserVersion'])

        if 'chrome' in self.browser.capabilities:
            if 'chromedriverVersion' in self.browser.capabilities['chrome']:
                chromedriver_version = str(self.browser.capabilities['chrome']['chromedriverVersion']).split(' ')[0]

        if browser_version.split('.')[0] != chromedriver_version.split('.')[0]:
            major_version_different = True

        # 버전 정보 출력
        print('_________________________________')
        print('Current web-browser version:\t{}'.format(browser_version))
        print('Current chrome-driver version:\t{}'.format(chromedriver_version))
        if major_version_different:
            print('warning: Version different')
            print('Download correct version at "http://chromedriver.chromium.org/downloads" and place in "./chromedriver"')
        print('_________________________________')

    # 현재 스크롤 위치 반환
    def get_scroll(self):
        pos = self.browser.execute_script("return window.pageYOffset;")
        return pos

    # XPath를 사용하여 요소를 기다린 후 클릭
    def wait_and_click(self, xpath):
        try:
            w = WebDriverWait(self.browser, 15)
            elem = w.until(EC.element_to_be_clickable((By.XPATH, xpath)))
            elem.click()
            self.highlight(elem)
        except Exception as e:
            print('Click time out - {}'.format(xpath))
            print('Refreshing browser...')
            self.browser.refresh()
            time.sleep(2)
            return self.wait_and_click(xpath)

        return elem

    # 요소를 강조 표시
    def highlight(self, element):
        self.browser.execute_script("arguments[0].setAttribute('style', arguments[1]);", element,
                                    "background: yellow; border: 2px solid red;")

    # 리스트에서 중복 제거
    @staticmethod
    def remove_duplicates(_list):
        return list(dict.fromkeys(_list))

    # 구글 이미지 검색 및 링크 수집
    def google(self, keyword, add_url=""):
        self.browser.get("https://www.google.com/search?q={}&source=lnms&tbm=isch{}".format(keyword, add_url))

        time.sleep(1)

        print('Scrolling down')

        elem = self.browser.find_element(By.TAG_NAME, "body")

        last_scroll = 0
        scroll_patience = 0
        NUM_MAX_SCROLL_PATIENCE = 50

        while True:
            elem.send_keys(Keys.PAGE_DOWN)
            time.sleep(0.2)

            scroll = self.get_scroll()
            if scroll == last_scroll:
                scroll_patience += 1
            else:
                scroll_patience = 0
                last_scroll = scroll

            if scroll_patience >= NUM_MAX_SCROLL_PATIENCE:
                break

        print('Scraping links')

        imgs = self.browser.find_elements(By.XPATH, '//div[@jsname="dTDiAc"]/div[@jsname="qQjpJ"]//img')

        links = []
        for idx, img in enumerate(imgs):
            try:
                src = img.get_attribute("src")
                links.append(src)

            except Exception as e:
                print('[Exception occurred while collecting links from google] {}'.format(e))

        links = self.remove_duplicates(links)

        print('Collect links done. Site: {}, Keyword: {}, Total: {}'.format('google', keyword, len(links)))
        self.browser.close()

        return links

    # 네이버 이미지 검색 및 링크 수집
    def naver(self, keyword, add_url=""):
        self.browser.get(
            "https://search.naver.com/search.naver?where=image&sm=tab_jum&query={}{}".format(keyword, add_url))

        time.sleep(1)

        print('Scrolling down')

        elem = self.browser.find_element(By.TAG_NAME, "body")

        for i in range(60):
            elem.send_keys(Keys.PAGE_DOWN)
            time.sleep(0.2)

        imgs = self.browser.find_elements(By.XPATH, '//div[@class="tile_item _fe_image_tab_content_tile"]//img[@class="_fe_image_tab_content_thumbnail_image"]')

        print('Scraping links')

        links = []

        for img in imgs:
            try:
                src = img.get_attribute("src")
                if src[0] != 'd':
                    links.append(src)
            except Exception as e:
                print('[Exception occurred while collecting links from naver] {}'.format(e))

        links = self.remove_duplicates(links)

        print('Collect links done. Site: {}, Keyword: {}, Total: {}'.format('naver', keyword, len(links)))
        self.browser.close()

        return links

    # 구글에서 고해상도 이미지 검색 및 링크 수집
    def google_full(self, keyword, add_url="", limit=100):
        print('[Full Resolution Mode]')

        self.browser.get("https://www.google.com/search?q={}&tbm=isch{}".format(keyword, add_url))
        time.sleep(1)

        # 첫 번째 이미지를 클릭하여 고해상도 이미지 가져오기
        self.wait_and_click('//div[@jsname="dTDiAc"]')
        time.sleep(1)

        body = self.browser.find_element(By.TAG_NAME, "body")

        print('Scraping links')

        links = []
        limit = 10000 if limit == 0 else limit
        count = 1
        last_scroll = 0
        scroll_patience = 0
        NUM_MAX_SCROLL_PATIENCE = 100

        while len(links) < limit:
            try:
                # 구글은 처음에 압축된 이미지를 렌더링하고 나중에 고해상도 이미지를 겹칩니다.
                xpath = '//div[@jsname="figiqf"]//img[not(contains(@src,"gstatic.com"))]'

                t1 = time.time()
                while True:
                    imgs = body.find_elements(By.XPATH, xpath)
                    t2 = time.time()
                    if len(imgs) > 0:
                        break
                    if t2 - t1 > 5:
                        print(f"Failed to locate image by XPATH: {xpath}")
                        break
                    time.sleep(0.1)

                if len(imgs) > 0:
                    self.highlight(imgs[0])
                    src = imgs[0].get_attribute('src')

                    if src is not None and src not in links:
                        links.append(src)
                        print('%d: %s' % (count, src))
                        count += 1
            except KeyboardInterrupt:
                break
                
            except StaleElementReferenceException:
                # print('[Expected Exception - StaleElementReferenceException]')
                pass
            except Exception as e:
                print('[Exception occurred while collecting links from google_full] {}'.format(e))

            scroll = self.get_scroll()
            if scroll == last_scroll:
                scroll_patience += 1
            else:
                scroll_patience = 0
                last_scroll = scroll

            if scroll_patience >= NUM_MAX_SCROLL_PATIENCE:
                break

            body.send_keys(Keys.RIGHT)

        links = self.remove_duplicates(links)

        print('Collect links done. Site: {}, Keyword: {}, Total: {}'.format('google_full', keyword, len(links)))
        self.browser.close()

        return links

    # 네이버에서 고해상도 이미지 검색 및 링크 수집
    def naver_full(self, keyword, add_url=""):
        print('[Full Resolution Mode]')

        self.browser.get(
            "https://search.naver.com/search.naver?where=image&sm=tab_jum&query={}{}".format(keyword, add_url))
        time.sleep(1)

        elem = self.browser.find_element(By.TAG_NAME, "body")

        print('Scraping links')

        # 첫 번째 이미지 클릭
        self.wait_and_click('//div[@class="tile_item _fe_image_tab_content_tile"]//img[@class="_fe_image_tab_content_thumbnail_image"]')
        time.sleep(1)

        links = []
        count = 1

        last_scroll = 0
        scroll_patience = 0

        while True:
            try:
                xpath = '//img[@class="_fe_image_viewer_image_fallback_target"]'
                imgs = self.browser.find_elements(By.XPATH, xpath)

                for img in imgs:
                    self.highlight(img)
                    src = img.get_attribute('src')

                    if src not in links and src is not None:
                        links.append(src)
                        print('%d: %s' % (count, src))
                        count += 1

            except StaleElementReferenceException:
                # print('[Expected Exception - StaleElementReferenceException]')
                pass
            except Exception as e:
                print('[Exception occurred while collecting links from naver_full] {}'.format(e))

            scroll = self.get_scroll()
            if scroll == last_scroll:
                scroll_patience += 1
            else:
                scroll_patience = 0
                last_scroll = scroll

            if scroll_patience >= 100:
                break

            elem.send_keys(Keys.RIGHT)

        links = self.remove_duplicates(links)

        print('Collect links done. Site: {}, Keyword: {}, Total: {}'.format('naver_full', keyword, len(links)))
        self.browser.close()

        return links


if __name__ == '__main__':
    collect = CollectLinks()
    links = collect.naver_full()  # '검색어 입력'
    print(len(links), links)
