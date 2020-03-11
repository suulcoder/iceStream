module.exports = {
 getAllUsers :`SELECT * FROM Users`,
 getAllSongs : `SELECT * FROM Track`,
 getAllGenre : "SELECT * FROM Genre",
 getAllMediaType : "SELECT * FROM MediaType",
 getUsersAddPermissions : "SELECT * FROM UserPermission",
 getCanInactivateSongPermissions : "SELECT * FROM TrackPermission WHERE canInactivate=True GROUP BY UserId",
 getCanUpdateSongPermissions : "SELECT * FROM TrackPermission WHERE canUpdate=True GROUP BY UserId",
 getCanDeleteSongPermissions : "SELECT * FROM TrackPermission WHERE canDelete=True GROUP BY UserId",
 getCanUpdateArtistPermissions : "SELECT * FROM ArtistPermission WHERE canUpdate=True GROUP BY UserId",
 getCanDeleteArtistPermissions : "SELECT * FROM ArtistPermission WHERE canDelete=True GROUP BY UserId",
 getCanUpdateAlbumPermissions : "SELECT * FROM AlbumPermission WHERE canUpdate=True GROUP BY UserId",
 getCanDeleteAlbumPermissions : "SELECT * FROM AlbumPermission WHERE canDelete=True GROUP BY UserId",
 getLastUserId :
    (`SELECT max(Userid)\n` +
        `FROM Users\n`),
 getLastArtistId :
    ("SELECT max(artistid)\n" +
        "from artist"),
 getAllPlaylistInfo :
    (`SELECT p1.name\n` +
        `from playlist p1\n` +
        `order by p1.name`),
 getAllSongsInPlaylist : (`SELECT p1.name, t1.name\n` +
    `from playlist p1 join playlisttrack pt1 on p1.playlistid = pt1.playlistid join track t1 on t1.trackid = pt1.trackid\n` +
    `where p1.playlistid = $1\n` +
    `order by p1.name, t1.name`),
 getMostCommonGenres : ('SELECT g1.name, count(g1.name)\n' +
    'from track t1 join genre g1 on t1.genreid = g1.genreid\n' +
    'group by g1.name\n' +
    'order by count(g1.name) desc'),
 getMostCommonArtist : ('SELECT ar1.name, count (ar1.name)\n' +
    'from album al1 join artist ar1 on al1.artistid = ar1.artistid\n' +
    'group by ar1.name\n' +
    'order by count(ar1.name) desc'),
 getLongestSongsWithArtists : ('SELECT t1.name, t1.milliseconds, a1.artistid, a1.name\n' +
    'from track t1 join artist a1 on t1.composer = a1.name\n' +
    'order by t1.milliseconds desc'),
 getDurationAverageByGenre : ('SELECT g1.name, avg(t1.milliseconds)\n' +
    'from track t1 join genre g1 on t1.genreid = g1.genreid\n' +
    'group by g1.name\n' +
    'order by avg(t1.milliseconds) desc'),
 getMostColaborativeArtists : ('SELECT ar1.name, count(ar1.name)\n' +
    'from album al1 join artist ar1 on al1.artistid = ar1.artistid join track t1 on t1.composer = ar1.name\n' +
    'group by ar1.name\n' +
    'order by count(ar1.name) desc'),
 addArtist : "INSERT INTO Artist (ArtistId, Name) VALUES ($1,$2);",
 addAlbum : "INSERT INTO Album (AlbumId, Title, ArtistId) VALUES ($1,$2,$3);",
 addTrack : "INSERT INTO Track (TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);",
 addUser : "INSERT INTO Users (UserId,Username,email,password,role) VALUES ($1,$2,$3,$4,$5);",
 UpdateArtist : "UPDATE Artist SET Name=$2 WHERE Userid=$1;",
 UpdateUser : "UPDATE Users SET Username=$2, email=$3, password=$4,role=$5 WHERE UserId=$1;",
 UpdateAlbum : "UPDATE Album SET Title=$2, ArtistId=$3 where AlbumID=$1",
 UpdateTrack : "UPDATE Track SET Name=$2, AlbumId=$3, MediaTypeId=$4, GenreId=$5, Composer=$6, Millisecons=$7, Bytes=$8, UnitPrice=$9 WHERE TrackId=$1",
}