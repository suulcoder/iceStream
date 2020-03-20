module.exports = {
 getAllUsers :`SELECT * FROM Users INNER JOIN UserPermissions ON Users.UserId=UserPermissions.UserId WHERE Users.role<>'admin'`,
 getAllArtist :`SELECT * FROM Artist`,
 getAllSongs : "SELECT Track.name, Track.composer, Track.trackid, Track.milliseconds, Track.bytes, Track.unitprice, Artist.name as artist ,Genre.name as genre, Mediatype.name as mediatype, Album.Title as album, Album.albumid as albumid, TrackState.state as state FROM Track JOIN Album ON Track.AlbumId=Album.AlbumId JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN Genre ON Track.GenreId=Genre.GenreId JOIN MediaType ON MediaType.MediaTypeId=Track.MediaTypeId JOIN TrackState ON TrackState.Trackid=Track.Trackid LIMIT 500",
 getAllAlbum : "SELECT Artist.name as artist, Album.title,Album.Albumid FROM Album JOIN Artist ON Artist.ArtistId=Album.ArtistId",
 getJustAllAlbum : "SELECT * FROM Album",
 getAllGenre : "SELECT * FROM Genre",
 getAllMediaType : "SELECT * FROM MediaType",
 getUsersAddPermissions : "SELECT * FROM UserPermission",
 getTrackPermissionINACTIVATE: "SELECT COUNT(UserId) FROM CanInactivateTrack WHERE UserId=$1",
 getTrackPermissionUPDATE: "SELECT COUNT(UserId) FROM CanUpdateTrack WHERE UserId=$1",
 getTrackPermissionDELETE: "SELECT COUNT(UserId) FROM CanDeleteTrack WHERE UserId=$1",
 getArtistPermissionUPDATE: "SELECT COUNT(UserId) FROM CanUpdateArtist WHERE UserId=$1",
 getArtistPermissionDELETE: "SELECT COUNT(UserId) FROM CanDeleteArtist WHERE UserId=$1",
 getAlbumPermissionUPDATE: "SELECT COUNT(UserId) FROM CanUpdateAlbum WHERE UserId=$1",
 getAlbumPermissionDELETE: "SELECT COUNT(UserId) FROM CanDeleteAlbum WHERE UserId=$1",
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
 addUserPermission: "INSERT INTO UserPermissions(UserId,canLogin,canAddArtist,canAddAlbum,canAddTrack,canInactivateSong,canModifiySong,canDeleteSong,canModifiyAlbum,canDeleteAlbum,canModifyArtist,canDeleteArtist) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);",
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
 
 searchTrack:"SELECT Track.name, Track.composer, Track.trackid, Track.milliseconds, Track.bytes, Track.unitprice, Artist.name as artist ,Genre.name as genre, Mediatype.name as mediatype, Album.Title as album, Album.albumid as albumid, TrackState.state as state FROM Track JOIN Album ON Track.AlbumId=Album.AlbumId JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN Genre ON Track.GenreId=Genre.GenreId JOIN MediaType ON MediaType.MediaTypeId=Track.MediaTypeId JOIN TrackState ON TrackState.Trackid=Track.Trackid WHERE Track.Name ILIKE $1 LIMIT 1",
 searchAlbum:"SELECT Album.Albumid, Album.title, Artist.Name as artist FROM Album JOIN Artist ON Album.ArtistId=Artist.ArtistId WHERE Album.Title ILIKE $1 LIMIT 1",
 searchArtist:"SELECT * FROM Artist WHERE Name ILIKE $1 LIMIT 1",
 searchUser:"SELECT UserId FROM Users WHERE Username LIKE $1 AND UserId<>1",

 addArtist : "INSERT INTO Artist (ArtistId, Name) VALUES ($1,$2);",
 addAlbum : "INSERT INTO Album (AlbumId, Title, ArtistId) VALUES ($1,$2,$3);",
 addTrack : "INSERT INTO Track (TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);",
 addUser : "INSERT INTO Users (UserId,Username,email,password,role) VALUES ($1,$2,$3,$4,$5);",
 
 selectAlbumID : "SELECT AlbumId FROM Album WHERE title=$1",
 selectARtistID : "SELECT ArtistID From Artist WHERE name=$1",
 selectMediaID : "SELECT MediaTypeId From MediaType WHERE Name=$1",
 selectGenreID : "SELECT GenreId From Genre WHERE name=$1",

 UpdateArtist : "UPDATE Artist SET Name=$2 WHERE Artistid=$1;",
 UpdateTrackState: "UPDATE TrackState SET state=$2 WHERE trackid=$1",
 UpdateUser : "UPDATE Users SET Username=$3, email=$3, password=$4,role=$5 WHERE UserId=$1;",
 UpdatePermission : "UPDATE UserPermissions SET canlogin=$2, canaddartist=$3, canaddalbum=$4, canaddtrack=$5, caninactivatesong=$6, canmodifiysong=$7, candeletesong=$8, canmodifiyalbum=$9, candeletealbum=$10, canmodifyartist=$11, candeleteartist=$12 WHERE UserId=$1;", 
 UpdateAlbum : "UPDATE Album SET Title=$2, ArtistId=$3 where AlbumID=$1",
 UpdateTrack : "UPDATE Track SET Name=$2, AlbumId=$3, MediaTypeId=$4, GenreId=$5, Composer=$6, Milliseconds=$7, Bytes=$8, UnitPrice=$9 WHERE TrackId=$1",
 
 deleteTrack: "DELETE FROM Track WHERE TrackId=$1;",
 deleteAlbum: "DELETE FROM Album WHERE AlbumId=$1;",
 deleteArtist: "DELETE FROM Artist WHERE ArtistId=$1;",


}