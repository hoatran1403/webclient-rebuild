package bookmarks;

/**
 * Created by ort1hc on 7/19/2017.
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String userId) {
        super("could not find user '" + userId + "'.");
    }
}
