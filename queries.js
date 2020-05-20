module.exports = {
   getAllUsers :`SELECT * FROM Users INNER JOIN UserPermissions ON Users.UserId=UserPermissions.UserId WHERE Users.role<>'admin'`,
   getAllArtist :`SELECT * FROM Artist`,
   getAllPlaylist :`SELECT * FROM Playlist`,
   getAllSongs : "SELECT Track.name, Track.composer, Track.trackid, Track.milliseconds, Track.bytes, Track.unitprice, Artist.name as artist ,Genre.name as genre, Mediatype.name as mediatype, Album.Title as album, Album.albumid as albumid, TrackState.state as state FROM Track JOIN Album ON Track.AlbumId=Album.AlbumId JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN Genre ON Track.GenreId=Genre.GenreId JOIN MediaType ON MediaType.MediaTypeId=Track.MediaTypeId JOIN TrackState ON TrackState.Trackid=Track.Trackid LIMIT 200",
   getSongs : "SELECT Track.name, Track.composer, Track.trackid, Track.milliseconds, Track.bytes, Track.unitprice, Artist.name as artist ,Genre.name as genre, Mediatype.name as mediatype, Album.Title as album, Album.albumid as albumid, TrackState.state as state FROM Track JOIN Album ON Track.AlbumId=Album.AlbumId JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN Genre ON Track.GenreId=Genre.GenreId JOIN MediaType ON MediaType.MediaTypeId=Track.MediaTypeId JOIN TrackState ON TrackState.Trackid=Track.Trackid LIMIT $1",
   getAllAlbum : "SELECT Artist.name as artist, Album.title,Album.Albumid FROM Album JOIN Artist ON Artist.ArtistId=Album.ArtistId",
   getJustAllAlbum : "SELECT * FROM Album",
   getAllGenre : "SELECT * FROM Genre",
   getAllMediaType : "SELECT * FROM MediaType",
   getAllTrackData: "SELECT trackid,name FROM Track",
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

   addSimulation : "SELECT * FROM simulate($1,$2,$3,$4);",
   addSimulationAction: "INSERT INTO Binnacle VALUES ($1, 'TRACK',$2,TO_CHAR(NOW(),'DD-MM-YY HH24:MI:SS'),$3,$4);",

   createPlaylist: "SELECT * FROM CreatePlaylist($1,$2,$3,$4,$5,$6,$7)",
   updatePlaylist: "SELECT * FROM UpdatePlaylist($1,$2,$3,$4,$5,$6,$7,$8)",
   deletePlaylist: "SELECT * FROM DeletePlaylist($1,$2)",

   getLastArtistId :
      ("SELECT max(artistid)\n" +
          "from artist"),
   getLastTrackId :
   ("SELECT max(trackid)\n" +
     "from Track"),
   getLastAlbumId :
     ("SELECT max(albumid)\n" +
        "from album"),
   getAllPlaylistInfo : 
      (`SELECT playlistid\n` +
          `FROM playlist`),
   getAllSongsInPlaylist : (`SELECT *\n` +
      `FROM playlist p1 join playlisttrack pt1 on p1.playlistid = pt1.playlistid join track t1 on t1.trackid = pt1.trackid`),
   getBoughtTracks: ("SELECT q.trackid FROM invoiceline as q JOIN invoice as i ON q.invoiceid=i.invoiceid WHERE i.customerid=$1"),
   getCustomer: ("SELECT * From customer"),
   getCart: "SELECT * FROM Cart",
   addCart: "INSERT INTO Cart Values($1,$1)",
   updateCart: "UPDATE Cart SET quantity=$2 WHERE trackid=$1",
   getBinnacle: "SELECT * FROM Binnacle JOIN Users ON Users.userid=Binnacle.userid WHERE simulationid IS NULL ORDER BY Binnacle.InDate DESC LIMIT 150",
   playTrack: "SELECT * FROM PlayTrack($1,$2)",

   //Reports 
  
   getMostCommonGenres : ('SELECT g1.name, count(g1.name)\n' +
      'from track t1 join genre g1 on t1.genreid = g1.genreid\n' +
      'group by g1.name\n' +
      'order by count(g1.name) desc LIMIT 10'),
   getMostCommonArtist : ('SELECT ar1.name, count (ar1.name)\n' +
      'from album al1 join artist ar1 on al1.artistid = ar1.artistid\n' +
      'group by ar1.name\n' +
      'order by count(ar1.name) desc LIMIT 10'),
   getLongestSongsWithArtists : ('SELECT t1.name, t1.milliseconds, a1.name as aname\n' +
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
   getUserwithmoreAlbumsAdded : "SELECT Users.Username,count(Users.username) FROM hasAddedTrack JOIN Users ON Users.userid=hasAddedTrack.userid group by Users.username order by count(Users.username) DESC LIMIT 10",
   getRecentAlbums:"SELECT * FROM Album JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN hasAddedAlbum ON Album.AlbumId=hasAddedAlbum.AlbumId Order by hasAddedAlbum.InDate DESC LIMIT 10 ", 
   getUserwithmoreTracksAdded : "SELECT Users.Username,count(Users.username) FROM hasAddedTrack JOIN Users ON Users.userid=hasAddedTrack.userid group by Users.username order by count(Users.username) DESC LIMIT 10",
   getAllPlaylistByDuration : "SELECT Playlist.Name as name, SUM(Track.Milliseconds) as duration FROM PlaylistTrack JOIN Playlist ON PlaylistTrack.PlaylistId=Playlist.PlaylistId JOIN Track ON PlaylistTrack.TrackId=Track.TrackId GROUP BY Playlist.Name",
   getPlaylistByArtistCount : "SELECT G.Name, COUNT(G.name) FROM (SELECT Playlist.Name as name, COUNT(Track.AlbumId) as number_of_artists FROM PlaylistTrack JOIN Playlist ON PlaylistTrack.PlaylistId=Playlist.PlaylistId JOIN Track ON PlaylistTrack.TrackId=Track.TrackId GROUP BY (Playlist.Name,Track.AlbumId)) G Group by G.name",
   getArtistByGenreCount : "SELECT Artist.name, COUNT(Artist.name) FROM (SELECT Artist.artistid as artist,track.genreid as genre FROM ARTIST JOIN Album ON Album.ArtistId=Artist.ArtistId JOIN TRACK ON Track.AlbumId=Album.AlbumId GROUP BY(artist.artistID,track.genreid)) G JOIN Artist ON G.artist=Artist.artistid JOIN Genre ON G.genre=Genre.genreid GROUP BY (Artist.name) ORDER BY COUNT(Artist.name) DESC LIMIT 5",
   
   searchTrack:"SELECT Track.name, Track.composer, Track.trackid, Track.milliseconds, Track.bytes, Track.unitprice, Artist.name as artist ,Genre.name as genre, Mediatype.name as mediatype, Album.Title as album, Album.albumid as albumid, TrackState.state as state FROM Track JOIN Album ON Track.AlbumId=Album.AlbumId JOIN Artist ON Album.ArtistId=Artist.ArtistId JOIN Genre ON Track.GenreId=Genre.GenreId JOIN MediaType ON MediaType.MediaTypeId=Track.MediaTypeId JOIN TrackState ON TrackState.Trackid=Track.Trackid WHERE Track.Name ILIKE $1 LIMIT 4",
   searchAlbum:"SELECT Album.Albumid, Album.title, Artist.Name as artist FROM Album JOIN Artist ON Album.ArtistId=Artist.ArtistId WHERE Album.Title ILIKE $1 LIMIT 1",
   searchArtist:"SELECT * FROM Artist WHERE Name ILIKE $1 LIMIT 1",
   searchUser:"SELECT UserId FROM Users WHERE Username LIKE $1 AND UserId<>1",
  
   addArtist : "INSERT INTO Artist (ArtistId, Name,lastuserid) VALUES ($1,$2,$3);",
  
   addUserAlbum : " INSERT INTO hasAddedAlbum (UserId,AlbumId,InDate) VALUES ($1,$2,$3)",
   addUserArtist : " INSERT INTO hasAddedArtist (UserId,ArtistId,InDate) VALUES ($1,$2,$3)",
   addUserTrack : " INSERT INTO hasAddedTrack (UserId,TrackId,InDate) VALUES ($1,$2,$3)",
   addAlbum : "INSERT INTO Album (AlbumId, Title, ArtistId,lastuserid) VALUES ($1,$2,$3,$4);",
   addTrack : "INSERT INTO Track (TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice,lastuserid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",
   addUser : "INSERT INTO Users (UserId,Username,email,password,role,isLogged) VALUES ($1,$2,$3,$4,$5,'True');",
   addtrackstate: "INSERT INTO TrackState (trackid,state) VALUES ($1,'TRUE')",
   
   selectAlbumID : "SELECT AlbumId FROM Album WHERE title=$1;",
   selectARtistID : "SELECT ArtistID From Artist WHERE name=$1;",
   selectMediaID : "SELECT MediaTypeId From MediaType WHERE Name=$1;",
   selectGenreID : "SELECT GenreId From Genre WHERE name=$1;",
  
   UpdateArtist : "UPDATE Artist SET Name=$2, lastuserid=$3 WHERE Artistid=$1;",
   UpdateTrackState: "UPDATE TrackState SET state=$2 WHERE trackid=$1;",
   UpdateUser : "UPDATE Users SET Username=$3, email=$3, password=$4,role=$5 WHERE UserId=$1;",
   UpdatePermission : "UPDATE UserPermissions SET canlogin=$2, canaddartist=$3, canaddalbum=$4, canaddtrack=$5, caninactivatesong=$6, canmodifiysong=$7, candeletesong=$8, canmodifiyalbum=$9, candeletealbum=$10, canmodifyartist=$11, candeleteartist=$12 WHERE UserId=$1;", 
   UpdateAlbum : "UPDATE Album SET Title=$2, ArtistId=$3, lastuserid=$4 where AlbumID=$1;",
   UpdateTrack : "UPDATE Track SET Name=$2, AlbumId=$3, MediaTypeId=$4, GenreId=$5, Composer=$6, Milliseconds=$7, Bytes=$8, UnitPrice=$9, lastuserid=$10 WHERE TrackId=$1;",
   
   Login: "UPDATE Users SET isLogged='True' WHERE Username=$1;",
   Logout: "UPDATE Users SET isLogged='False' WHERE Username=$1;", 

   BeforeDeleteTrack: "INSERT INTO Binnacle(Id,element,action,InDate,userId,simulationid) VALUES ($1, 'TRACK','CREATE',TO_CHAR(NOW(),'DD-MM-YY HH24:MI:SS'),$2,0);",
   deleteTrack: "DELETE FROM Track WHERE TrackId=$1;",
   BeforeDeleteAlbum: "INSERT INTO Binnacle(Id,element,action,InDate,userId,simulationid) VALUES ($1, 'ALBUM','CREATE',TO_CHAR(NOW(),'DD-MM-YY HH24:MI:SS'),$2,0);", 
   deleteAlbum: "DELETE FROM Album WHERE AlbumId=$1;",
   BeforeDeleteArtist: "INSERT INTO Binnacle(Id,element,action,InDate,userId,simulationid) VALUES ($1, 'ARTIST','CREATE',TO_CHAR(NOW(),'DD-MM-YY HH24:MI:SS'),$2,0);",
   deleteArtist: "DELETE FROM Artist WHERE ArtistId=$1;",
   buy: "SELECT * FROM BUY($1,$2,$3)",
   invoice: "SELECT * FROM MakeInvoice($1,$2)"

  
}