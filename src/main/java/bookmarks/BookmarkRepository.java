package bookmarks;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

/**
 * Created by ort1hc on 7/19/2017.
 */
public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{
    Collection<Bookmark> findByAccountUsername(String username);
}
