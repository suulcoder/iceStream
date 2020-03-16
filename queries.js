module.exports = {
 getAllUsers :`SELECT * FROM Users JOIN UserPermissions ON Users.UserId=UserPermissions.UserId WHERE Users.role<>'admin'`,
 getAllArtist :`SELECT * FROM Artist`,
 getAllSongs : "SELECT Track.name, Track.composer, Track.trackid, Track.milliseconds, Track.bytes, Track.unitprice, Artist.name as artist ,Genre.name as genre, Mediatype.name as mediatype, Album.Title as album, Album.albumid as albumid FROM Track JOIN Album ON Track.AlbumId=Album.AlbumId JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN Genre ON Track.GenreId=Genre.GenreId JOIN MediaType ON MediaType.MediaTypeId=Track.MediaTypeId LIMIT 50",
 getAllAlbum : "SELECT Artist.name as artist, Album.title,Album.Albumid FROM Album JOIN Artist ON Artist.ArtistId=Album.ArtistId",
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
 getUserByUsername : "SELECT * FROM Users INNER JOIN UserPermissions ON Users.UserId=UserPermissions.UserId WHERE Username=$1 AND password=$2 AND canLogin='TRUE'",
 checkUserByUsername : "SELECT * FROM Users WHERE Username=$1",
 addUser: "INSERT INTO Users (UserId,Username,email,password,role) VALUES ($1,$2,$3,$4,$5)",
 addUserPermission: "INSERT INTO UserPermissions(UserId,canLogin,canAddArtist,canAddAlbum,canAddTrack) VALUES ($1,$2,$3,$4,$5);",
 getLastUserId : `SELECT max(Userid) FROM Users\n`,
 getLastArtistId :
    ("SELECT max(artistid)\n" +
        "from artist"),
 getAllPlaylistInfo : 
    (`SELECT playlistid\n` +
        `FROM playlist`),
 getAllSongsInPlaylist : (`SELECT *\n` +
    `FROM playlist p1 join playlisttrack pt1 on p1.playlistid = pt1.playlistid join track t1 on t1.trackid = pt1.trackid`),
 //Reports 

 getMostCommonGenres : ('SELECT g1.name, count(g1.name)\n' +
    'from track t1 join genre g1 on t1.genreid = g1.genreid\n' +
    'group by g1.name\n' +
    'order by count(g1.name) desc LIMIT 10'),
 getMostCommonArtist : ('SELECT ar1.name, count (ar1.name)\n' +
    'from album al1 join artist ar1 on al1.artistid = ar1.artistid\n' +
    'group by ar1.name\n' +
    'order by count(ar1.name) desc LIMIT 10'),
 getLongestSongsWithArtists : ('SELECT t1.name, t1.milliseconds, a1.artistid, a1.name\n' +
    'from track t1 join artist a1 on t1.composer = a1.name\n' +
    'order by t1.milliseconds desc LIMIT 10'),
 getDurationAverageByGenre : ('SELECT g1.name, avg(t1.milliseconds)\n' +
    'from track t1 join genre g1 on t1.genreid = g1.genreid\n' +
    'group by g1.name\n' +
    'order by avg(t1.milliseconds) desc LIMIT 10'),
 getMostColaborativeArtists : ('SELECT ar1.name, count(ar1.name)\n' +
    'from album al1 join artist ar1 on al1.artistid = ar1.artistid join track t1 on t1.composer = ar1.name\n' +
    'group by ar1.name\n' +
    'order by count(ar1.name) desc LIMIT 10'),
 getUserwithmoreAlbumsAdded : "SELECT * FROM hasAddedAlbum",
 getRecentAlbums:"SELECT * FROM Album JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN hasAddedAlbum ON Album.AlbumId=hasAddedAlbum.AlbumId", 
 
 addArtist : "INSERT INTO Artist (ArtistId, Name) VALUES ($1,$2);",
 addAlbum : "INSERT INTO Album (AlbumId, Title, ArtistId) VALUES ($1,$2,$3);",
 addTrack : "INSERT INTO Track (TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);",
 addUser : "INSERT INTO Users (UserId,Username,email,password,role) VALUES ($1,$2,$3,$4,$5);",
 UpdateArtist : "UPDATE Artist SET Name=$2 WHERE Userid=$1;",
 UpdateUser : "UPDATE Users SET Username=$2, email=$3, password=$4,role=$5 WHERE UserId=$1;",
 UpdateAlbum : "UPDATE Album SET Title=$2, ArtistId=$3 where AlbumID=$1",
 UpdateTrack : "UPDATE Track SET Name=$2, AlbumId=$3, MediaTypeId=$4, GenreId=$5, Composer=$6, Millisecons=$7, Bytes=$8, UnitPrice=$9 WHERE TrackId=$1",
}