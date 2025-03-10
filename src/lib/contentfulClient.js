// import { createClient } from "contentful";

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

const getAllAlbums = async () => {
    try {
        const getAlbumEntries = await client.getEntries({
            content_type: "album",
        });

        // console.log(getAlbumEntries);
        return getAlbumEntries.items;
    } catch (error) {
        console.error(error.message);
    }
};

const getNewArrivals = async () => {
    try {
        const getAlbumEntries = await client.getEntries({
            content_type: "album",
            limit: 10,
            order: "-sys.updatedAt",
        });

        return getAlbumEntries.items;
    } catch (error) {
        console.error(error.message);
    }
};

const getSingleAlbum = async (albumId) => {
    try {
        const getEntry = await client.getEntry(albumId);
        // console.log(getEntry.fields);
        return getEntry;
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * function for getting relevant recs based on genre
 * @param  albumGenre should be an array
 * @param albumId keeps the album on the page from the rec list, should be the sys id of the album
 */
const getRecs = async (albumGenre, albumId) => {
    const genreString = albumGenre.toString();
    try {
        const getAlbumRecs = await client.getEntries({
            content_type: "album",
            limit: 12,
            "fields.genre[in]": genreString,
            "sys.id[ne]": albumId,
        });
        return getAlbumRecs.items;
    } catch (error) {
        console.error(error.message);
    }
};

const getUser = async (form) => {
    try {
        // if (!form.email || !form.password)
        //     throw new Error(alert("Please enter a valid email and password!"));
        const getUserEntry = await client.getEntries({
            content_type: "user",
            "fields.email": `${form.email}`,
            "fields.password": `${form.password}`,
        });
        // if (!getUserEntry.items.length)
        //     throw new Error(alert("Invalid email or password!"));
        // console.log(getUserEntry.items[0]);
        return getUserEntry.items;
    } catch (error) {
        console.error(error);
    }
};

//logic for getting single user-not currently needed, but could be useful
// const getUserById = async (userId) => {
//     try {
//         const getEntry = await client.getEntry(userId);
//         // console.log(getEntry.fields);
//         return getEntry;
//     } catch (error) {
//         console.error(error.message);
//     }
// };

export // client,
// getAllAlbums,
// getNewArrivals,
// getSingleAlbum,
// getUser,
// getRecs,
// getUserById,
 {};
