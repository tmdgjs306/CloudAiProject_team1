package com.ryan9025.dog_dictionary.dto;

import com.ryan9025.dog_dictionary.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
// Spring Security 에서 제공하는 인증 방법인 UserDetails 를 사용하면 간단하게 사용자 인증을 할 수 있다.
@Data
public class CustomUserDetails implements UserDetails {
    private User loggedMember;

    public CustomUserDetails(User loggedMember) {
        this.loggedMember = loggedMember;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            // 설정해 놓은 ROLE 가져오기
            @Override
            public String getAuthority() {
                return loggedMember.getRole();
            }
        });
        return collection;
    }

    @Override
    public String getPassword() {
        return loggedMember.getPassword();
    }

    @Override
    public String getUsername() {
        return loggedMember.getUserId();
    }

}
