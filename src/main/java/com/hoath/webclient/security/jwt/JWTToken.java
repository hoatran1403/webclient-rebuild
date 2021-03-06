package com.hoath.webclient.security.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by ort1hc on 7/21/2017.
 *
 * Object to return as body in JWT Authentication.
 */
public class JWTToken {

    private String idToken;

    public JWTToken(String idToken) {
        this.idToken = idToken;
    }

    @JsonProperty("id_token")
    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }
}
