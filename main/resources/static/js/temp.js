let cards =[
    {'label':'abc','img_src':'https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg'},
    {'label':'def','img_src':'https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg'},
    {'label':'hij','img_src':'https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg'},
    {'label':'klm','img_src':'https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg'},
    {'label':'nop','img_src':'https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg'},
];

function addCard(parent_div,img_src,label_text){
    let card = document.createElement('div');   // div 생성
    card.classList.add('card');                 // class 설정
    // card.setAttribute('id','myID');             // id 설정
    parent_div.append(card);

    let img = document.createElement('img');   // img 생성
    img.src = img_src;
    img.style.height = '30px';
    img.style.width = '30px';
    card.append(img);

    let label = document.createElement('div');   // 라벨 생성
    label.innerHTML = label_text;
    card.append(label);

    card.style.display = 'inline-block';
    card.style.border = '1px solid gray';
    card.style.margin = '10px';
    card.style.width = '50px';
    card.style.height = '70px';
}

function init(){
    for (const card of cards){
        addCard(document.body,card.img_src,card.label);
    }
}

init();
