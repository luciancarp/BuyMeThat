package com.buymethat.server;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class VerifyIdentity {
    final private String CLIENT_ID = "383358003183-kda99nobe79il0i18ipu1vqrl500p1jq.apps.googleusercontent.com";

    final private String idTokenString;
    final private GoogleIdToken idToken;

    public VerifyIdentity(String idTokenString) throws GeneralSecurityException, IOException {
        this.idTokenString = idTokenString;
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        idToken = verifier.verify(idTokenString);
    }

    public String getId() {
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            return payload.getSubject();
        }
        else {
            return null;
        }
    }

    public String getEmail() {
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            return payload.getEmail();
        }
        else {
            return null;
        }
    }

    public String getFirstName() {
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            return (String) payload.get("given_name");
        }
        else {
            return null;
        }
    }

    public String getLastName() {
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            return (String) payload.get("family_name");
        }
        else {
            return null;
        }
    }
}
