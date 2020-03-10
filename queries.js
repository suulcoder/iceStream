
const getAllUsers = () => `SELECT * FROM Customer`;

const getLastCustomerId = () =>
    (`SELECT max(customerid)\n` +
        `FROM customer\n`);

const getLastArtistId = () =>
    ("SELECT max(artistid)\n" +
        "from artist");

const getAllPlaylistInfo = () =>
    (`SELECT p1.name\n` +
        `from playlist p1\n` +
        `order by p1.name`);

const getAllSongsInPlaylist = (playlistName) => `SELECT p1.name, t1.name\n` +
    `from playlist p1 join playlisttrack pt1 on p1.playlistid = pt1.playlistid join track t1 on t1.trackid = pt1.trackid\n` +
    `where p1.name = '${playlistName}'\n` +
    `order by p1.name, t1.name`;

const getPermitFromUser = (user) => `SELECT p1.permit\n` +
    `from customer c1 join permissions p1 on c1.customerid = p1.customerid\n` +
    `where customer = "${user}"`;

const getMostCommonGenres = () => 'SELECT g1.name, count(g1.name)\n' +
    'from track t1 join genre g1 on t1.genreid = g1.genreid\n' +
    'group by g1.name\n' +
    'order by count(g1.name) desc';

const getMostCommonArtist = () => 'SELECT ar1.name, count (ar1.name)\n' +
    'from album al1 join artist ar1 on al1.artistid = ar1.artistid\n' +
    'group by ar1.name\n' +
    'order by count(ar1.name) desc';

const getLongestSongsWithArtists = () => 'SELECT t1.name, t1.milliseconds, a1.artistid, a1.name\n' +
    'from track t1 join artist a1 on t1.composer = a1.name\n' +
    'order by t1.milliseconds desc';

const getDurationAverageByGenre = () => 'SELECT g1.name, avg(t1.milliseconds)\n' +
    'from track t1 join genre g1 on t1.genreid = g1.genreid\n' +
    'group by g1.name\n' +
    'order by avg(t1.milliseconds) desc';

const getMostColaborativeArtists = () => 'SELECT ar1.name, count(ar1.name)\n' +
    'from album al1 join artist ar1 on al1.artistid = ar1.artistid join track t1 on t1.composer = ar1.name\n' +
    'group by ar1.name\n' +
    'order by count(ar1.name) desc';

