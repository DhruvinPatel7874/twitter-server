const express = require("express");
const app = express();
const axios = require("axios");
const moment = require("moment");

const users = [
    {id: "44196397",name: "elonmusk"},
    {id: "137017726",name: "kritisanon"},
];

const BASIC_URL = "https://api.twitter.com/2/";
const USER_PATH = `users/by/username/${users[1].name}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,organic_metrics,possibly_sensitive,promoted_metrics,public_metrics,referenced_tweets,source,text`;
const USER_TWEET_PATH = `users/${users[1].id}/tweets?expansions=attachments.poll_ids,attachments.media_keys,author_id,geo.place_id,in_reply_to_user_id,referenced_tweets.id,entities.mentions.username,referenced_tweets.id.author_id&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified&media.fields=duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type`;
const USER_MENTION_PATH = `users/${users[1].id}/mentions?tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified&media.fields=duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type`;
const USER_BOTOMETER_PATH = "https://botometer-pro.p.rapidapi.com/4/check_account";
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAACCiZgEAAAAAHiLrAtS4SoUfnKoCSJ045B0JwqA%3DbftuB6RiaA4i2yFj3GT5KJ3bqWcYtBXjmTXyJo8woi50SAwuhB";

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const getUserData = async (userName) => {
    const USER_PATH = `users/by/username/${userName}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,organic_metrics,possibly_sensitive,promoted_metrics,public_metrics,referenced_tweets,source,text`;
    const options = {
        method: 'GET',
        url: BASIC_URL + USER_PATH,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${BEARER_TOKEN}`
        },
    };

    const userData = await axios.request(options).then(function (response) {
        const userData = response.data.data;
        return userData;
    }).catch(function (error) {
        return [];
    });

    return userData;
}

const getUserTweeterData = async (userId) => {
    const USER_TWEET_PATH = `users/${userId}/tweets?expansions=attachments.poll_ids,attachments.media_keys,author_id,geo.place_id,in_reply_to_user_id,referenced_tweets.id,entities.mentions.username,referenced_tweets.id.author_id&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified&media.fields=duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type`;

    const options = {
        method: 'GET',
        url: BASIC_URL + USER_TWEET_PATH,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${BEARER_TOKEN}`
        },
    };

    const tweetData = await axios.request(options).then(function (tweetRes) {
        return tweetRes.data.data;
    }).catch(function (error) {
        return [];
    });

    return tweetData;
}

const getUserMentionsData = async (userId) => {
    const USER_MENTION_PATH = `users/${userId}/mentions?tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified&media.fields=duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type`;
    const options = {
        method: 'GET',
        url: BASIC_URL + USER_MENTION_PATH,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${BEARER_TOKEN}`
        },
    };

    const mentionsData = await axios.request(options).then(function (mentionsRes) {
        return mentionsRes.data.data;
    }).catch(function (error) {
        return [];
    });

    return mentionsData;
}

app.get("/",(req,res) => {
    const apiKey = "KrEEkmOHaC9Bn9DPpGyRL6pIs"; //Consumer Key
    const apiKeySecret = "o8ULFCGWx5TzVAdUz7ttBUYwQsCdNK6EhSVn856TJqPe0ZacOy"; //Consumer Key Secret
    const bearerToken = "AAAAAAAAAAAAAAAAAAAAACCiZgEAAAAAHiLrAtS4SoUfnKoCSJ045B0JwqA%3DbftuB6RiaA4i2yFj3GT5KJ3bqWcYtBXjmTXyJo8woi50SAwuhB";
    var options = {
        method: 'POST',
        url: 'https://botometer-pro.p.rapidapi.com/4/check_account',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'botometer-pro.p.rapidapi.com',
            'x-rapidapi-key': '49d6809814mshb61d03b114bdae5p189778jsn6223a6176ff8'
        },
        data: {
            // mentions: [
            //     {
            //         contributors: null,
            //         coordinates: null,
            //         created_at: 'Fri Aug 07 11:26:56 +0000 2020',
            //         entities: {
            //             hashtags: [],
            //             symbols: [],
            //             urls: [],
            //             user_mentions: [
            //                 {
            //                     id: 11330,
            //                     id_str: '11330',
            //                     indices: [3, 11],
            //                     name: 'test user 1',
            //                     screen_name: 'screen_name'
            //                 }
            //             ]
            //         },
            //         favorite_count: 0,
            //         favorited: false,
            //         geo: null,
            //         id: 1291697,
            //         id_str: '1291697',
            //         in_reply_to_screen_name: null,
            //         in_reply_to_status_id: null,
            //         in_reply_to_status_id_str: null,
            //         in_reply_to_user_id: null,
            //         in_reply_to_user_id_str: null,
            //         is_quote_status: false,
            //         lang: 'en',
            //         metadata: {iso_language_code: 'en', result_type: 'recent'},
            //         place: null,
            //         retweet_count: 14,
            //         retweeted: false,
            //         retweeted_status: {
            //             contributors: null,
            //             coordinates: null,
            //             created_at: 'Mon Jul 20 16:03:30 +0000 2020',
            //             entities: {hashtags: [], symbols: [], urls: [], user_mentions: []},
            //             favorite_count: 35,
            //             favorited: false,
            //             geo: null,
            //             id: 128524,
            //             id_str: '128524',
            //             in_reply_to_screen_name: null,
            //             in_reply_to_status_id: null,
            //             in_reply_to_status_id_str: null,
            //             in_reply_to_user_id: null,
            //             in_reply_to_user_id_str: null,
            //             is_quote_status: false,
            //             lang: 'en',
            //             metadata: {iso_language_code: 'en', result_type: 'recent'},
            //             place: null,
            //             possibly_sensitive: false,
            //             retweet_count: 14,
            //             retweeted: false,
            //             source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
            //             text: 'orignial tweet',
            //             truncated: true,
            //             user: {
            //                 contributors_enabled: false,
            //                 created_at: 'Mon May 27 17:57:42 +0000 2019',
            //                 default_profile: true,
            //                 default_profile_image: false,
            //                 description: 'description',
            //                 entities: {},
            //                 favourites_count: 754,
            //                 follow_request_sent: false,
            //                 followers_count: 130,
            //                 following: false,
            //                 friends_count: 295,
            //                 geo_enabled: false,
            //                 has_extended_profile: true,
            //                 id: 11330,
            //                 id_str: '11330',
            //                 is_translation_enabled: false,
            //                 is_translator: false,
            //                 lang: null,
            //                 listed_count: 3,
            //                 location: 'location',
            //                 name: 'test user 1',
            //                 notifications: false,
            //                 profile_background_color: 'F5F8FA',
            //                 profile_background_image_url: null,
            //                 profile_background_image_url_https: null,
            //                 profile_background_tile: false,
            //                 profile_banner_url: null,
            //                 profile_image_url: null,
            //                 profile_image_url_https: null,
            //                 profile_link_color: '1DA1F2',
            //                 profile_sidebar_border_color: 'C0DEED',
            //                 profile_sidebar_fill_color: 'DDEEF6',
            //                 profile_text_color: '333333',
            //                 profile_use_background_image: true,
            //                 protected: false,
            //                 screen_name: 'screen_name',
            //                 statuses_count: 283,
            //                 time_zone: null,
            //                 translator_type: 'none',
            //                 url: null,
            //                 utc_offset: null,
            //                 verified: false
            //             }
            //         },
            //         source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
            //         text: 'RT @test_screen_name: test tweet',
            //         truncated: false,
            //         user: {
            //             contributors_enabled: false,
            //             created_at: 'Fri Jan 28 02:42:39 +0000 2011',
            //             default_profile: true,
            //             default_profile_image: false,
            //             description: '',
            //             entities: {description: {urls: []}},
            //             favourites_count: 5756,
            //             follow_request_sent: false,
            //             followers_count: 31,
            //             following: false,
            //             friends_count: 260,
            //             geo_enabled: true,
            //             has_extended_profile: false,
            //             id: 24391,
            //             id_str: '24391',
            //             is_translation_enabled: false,
            //             is_translator: false,
            //             lang: null,
            //             listed_count: 0,
            //             location: 'location',
            //             name: 'test user 2',
            //             notifications: false,
            //             profile_background_color: 'C0DEED',
            //             profile_background_image_url: null,
            //             profile_background_image_url_https: null,
            //             profile_background_tile: false,
            //             profile_image_url: null,
            //             profile_image_url_https: null,
            //             profile_link_color: '1DA1F2',
            //             profile_sidebar_border_color: 'C0DEED',
            //             profile_sidebar_fill_color: 'DDEEF6',
            //             profile_text_color: '333333',
            //             profile_use_background_image: true,
            //             protected: false,
            //             screen_name: 'test_screen_name_2',
            //             statuses_count: 351,
            //             time_zone: null,
            //             translator_type: 'none',
            //             url: null,
            //             utc_offset: null,
            //             verified: false
            //         }
            //     }
            // ],
            // timeline: [
            //     {
            //         contributors: null,
            //         coordinates: null,
            //         created_at: 'Fri Aug 07 14:26:36 +0000 2020',
            //         entities: {
            //             hashtags: [],
            //             symbols: [],
            //             urls: [],
            //             user_mentions: [
            //                 {
            //                     id: 2584,
            //                     id_str: '2584',
            //                     indices: [0, 12],
            //                     name: 'mentined user',
            //                     screen_name: 'mentioned_user'
            //                 }
            //             ]
            //         },
            //         favorite_count: 0,
            //         favorited: false,
            //         geo: null,
            //         id: 12917,
            //         id_str: '12917',
            //         in_reply_to_screen_name: 'mentioned_user',
            //         in_reply_to_status_id: 1291741,
            //         in_reply_to_status_id_str: '1291741',
            //         in_reply_to_user_id: 2584,
            //         in_reply_to_user_id_str: '2584',
            //         is_quote_status: false,
            //         lang: 'und',
            //         place: null,
            //         retweet_count: 0,
            //         retweeted: false,
            //         source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
            //         text: '@mentioned_user Yes',
            //         truncated: false,
            //         user: {
            //             contributors_enabled: false,
            //             created_at: 'Mon May 27 17:57:42 +0000 2019',
            //             default_profile: true,
            //             default_profile_image: false,
            //             description: 'description',
            //             entities: {description: {urls: []}, url: {urls: []}},
            //             favourites_count: 754,
            //             follow_request_sent: false,
            //             followers_count: 130,
            //             following: false,
            //             friends_count: 295,
            //             geo_enabled: false,
            //             has_extended_profile: true,
            //             id: 11330,
            //             id_str: '11330',
            //             is_translation_enabled: false,
            //             is_translator: false,
            //             lang: null,
            //             listed_count: 3,
            //             location: 'location',
            //             name: 'test user 1',
            //             notifications: false,
            //             profile_background_color: 'F5F8FA',
            //             profile_background_image_url: null,
            //             profile_background_image_url_https: null,
            //             profile_background_tile: false,
            //             profile_banner_url: null,
            //             profile_image_url: null,
            //             profile_image_url_https: null,
            //             profile_link_color: '1DA1F2',
            //             profile_sidebar_border_color: 'C0DEED',
            //             profile_sidebar_fill_color: 'DDEEF6',
            //             profile_text_color: '333333',
            //             profile_use_background_image: true,
            //             protected: false,
            //             screen_name: 'screen_name_2',
            //             statuses_count: 283,
            //             time_zone: null,
            //             translator_type: 'none',
            //             url: null,
            //             utc_offset: null,
            //             verified: false
            //         }
            //     }
            // ],
            user: {id_str: '1465582790238298114', screen_name: '@AmitMis28134977'}
        }
    };

    axios.request(options).then(function (response) {
        console.log("Twitter Response ==> ",response.data);
    }).catch(function (error) {
        console.error("Twitter Error ==> ",error);
    });

    res.send("Hello World");
});

app.get("/getUserDataByName",(req, res) => {
    const options = {
        method: 'GET',
        url: BASIC_URL + USER_PATH,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${BEARER_TOKEN}`
        },
    };

    axios.request(options).then(function (response) {
        const userData = response.data;

        const options1 = {
            method: 'GET',
            url: BASIC_URL + USER_TWEET_PATH,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${BEARER_TOKEN}`
            },
        };

        axios.request(options1).then(function (tweetRes) {
            const responseData = {
                name: userData.data.name || "",
                followers_count: userData.data?.public_metrics?.followers_count || "",
                following_count: userData.data?.public_metrics?.following_count || "",
                tweet_count: userData.data?.public_metrics?.tweet_count || "",
                description: userData.data?.description || "",
                tweetData: tweetRes.data.data || [],
            }
            res.send({...responseData});
        }).catch(function (error) {
            res.send("Something Went Wrong....");
        });
    }).catch(function (error) {
        res.send("Something Went Wrong....");
    });
});

app.get("/getUserTweetsDataById",(req, res) => {
    const options = {
        method: 'GET',
        url: BASIC_URL + USER_TWEET_PATH,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${BEARER_TOKEN}`
        },
    };

    axios.request(options).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.send("Something Went Wrong....");
    });
});

app.get("/getUserMentionsDataById",(req, res) => {
    const options = {
        method: 'GET',
        url: BASIC_URL + USER_MENTION_PATH,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${BEARER_TOKEN}`
        },
    };

    axios.request(options).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.send("Something Went Wrong....");
    });
});

app.get("/formatDate", (req, res) => {
    res.send(moment("2022-03-11T09:48:15.000Z").format('ddd MMM DD HH:mm:ss ZZ YYYY'));
})

app.get("/getUserBotometer",async (req, res) => {
    const {userName} = req.query;

    const userData = await getUserData(userName);
    const tweetsData = await getUserTweeterData(userData?.id);
    const mentionsData = await getUserMentionsData(userData?.id);

    const customMentionsPayload = {
        contributors: null,
        coordinates: null,
        created_at: mentionsData[0]?.created_at && moment(mentionsData[0]?.created_at).format('ddd MMM DD HH:mm:ss ZZ YYYY')|| null,
        entities: {
            hashtags: [],
            symbols: [],
            // urls: userData?.entities?.url?.urls || [],
            urls: [],
            user_mentions: mentionsData[0].entities.mentions.map(data => {
                return {
                    id: +data.id,
                    id_str: data.id,
                    indices: [data.start, data.end],
                    name: data.username,
                    screen_name: data.username
                }
            }) || []
        },
        favorite_count: 0,
        favorited: false,
        geo: null,
        id: +mentionsData[0]?.id || null,
        id_str: mentionsData[0]?.id || null,
        in_reply_to_screen_name: null,
        in_reply_to_status_id: null,
        in_reply_to_status_id_str: null,
        // in_reply_to_user_id: +mentionsData[0]?.in_reply_to_user_id || null,
        in_reply_to_user_id: null,
        // in_reply_to_user_id_str: mentionsData[0]?.in_reply_to_user_id || null,
        in_reply_to_user_id_str: null,
        is_quote_status: false,
        lang: mentionsData[0]?.lang || null,
        metadata: {iso_language_code: 'en', result_type: 'recent'},
        place: null,
        retweet_count: mentionsData[0]?.public_metrics?.retweet_count || 0,
        retweeted: false,
        retweeted_status: {
            contributors: null,
            coordinates: null,
            created_at: 'Mon Jul 20 16:03:30 +0000 2020',
            entities: {hashtags: [], symbols: [], urls: [], user_mentions: []},
            favorite_count: 0,
            favorited: false,
            geo: null,
            id: +userData?.id || null,
            id_str: userData?.id || null,
            in_reply_to_screen_name: null,
            in_reply_to_status_id: null,
            in_reply_to_status_id_str: null,
            in_reply_to_user_id: null,
            in_reply_to_user_id_str: null,
            is_quote_status: false,
            lang: 'en',
            metadata: {iso_language_code: 'en', result_type: 'recent'},
            place: null,
            possibly_sensitive: false,
            retweet_count: 14,
            retweeted: false,
            source: mentionsData[0]?.source || null,
            text: mentionsData[0]?.text || null,
            truncated: true,
            user: {
                contributors_enabled: false,
                created_at: userData?.created_at && moment(userData?.created_at).format('ddd MMM DD HH:mm:ss ZZ YYYY')|| null,
                default_profile: true,
                default_profile_image: false,
                description: 'description',
                entities: {},
                favourites_count: 0,
                follow_request_sent: false,
                followers_count: userData?.public_metrics?.followers_count || 0,
                following: false,
                friends_count: 0,
                geo_enabled: false,
                has_extended_profile: true,
                id: +userData?.id || null,
                id_str: userData?.id || null,
                is_translation_enabled: false,
                is_translator: false,
                lang: null,
                listed_count: userData?.public_metrics?.listed_count || 0,
                location: 'location',
                name: userData?.name || null,
                notifications: false,
                profile_background_color: 'F5F8FA',
                profile_background_image_url: null,
                profile_background_image_url_https: null,
                profile_background_tile: false,
                profile_banner_url: null,
                profile_image_url: null,
                profile_image_url_https: null,
                profile_link_color: '1DA1F2',
                profile_sidebar_border_color: 'C0DEED',
                profile_sidebar_fill_color: 'DDEEF6',
                profile_text_color: '333333',
                profile_use_background_image: true,
                protected: false,
                screen_name: userData?.username || null,
                statuses_count: 0,
                time_zone: null,
                translator_type: 'none',
                url: null,
                utc_offset: null,
                verified: false
            }
        },
        source: mentionsData[0]?.source || null,
        text: mentionsData[0]?.text || null,
        truncated: false,
        user: {
            contributors_enabled: false,
            created_at: userData?.created_at && moment(userData?.created_at).format('ddd MMM DD HH:mm:ss ZZ YYYY')|| null,
            default_profile: true,
            default_profile_image: false,
            description: '',
            // entities: {description: {urls: userData?.entities?.url?.urls || []}},
            entities: {description: {urls: []}},
            favourites_count: 0,
            follow_request_sent: false,
            followers_count: userData?.public_metrics?.followers_count || 0,
            following: false,
            friends_count: 0,
            geo_enabled: true,
            has_extended_profile: false,
            id: +userData?.id || null,
            id_str: userData?.id || null,
            is_translation_enabled: false,
            is_translator: false,
            lang: null,
            listed_count: userData?.public_metrics?.listed_count || 0,
            location: 'location',
            name: userData?.name || null,
            notifications: false,
            profile_background_color: 'C0DEED',
            profile_background_image_url: null,
            profile_background_image_url_https: null,
            profile_background_tile: false,
            profile_image_url: null,
            profile_image_url_https: null,
            profile_link_color: '1DA1F2',
            profile_sidebar_border_color: 'C0DEED',
            profile_sidebar_fill_color: 'DDEEF6',
            profile_text_color: '333333',
            profile_use_background_image: true,
            protected: false,
            screen_name: userData?.username || null,
            statuses_count: 0,
            time_zone: null,
            translator_type: 'none',
            url: null,
            utc_offset: null,
            verified: false
        }
    }

    const customTimelinePayload = {
        contributors: null,
        coordinates: null,
        created_at: tweetsData[0]?.created_at && moment(tweetsData[0]?.created_at).format('ddd MMM DD HH:mm:ss ZZ YYYY')|| null,
        entities: {
            // hashtags: tweetsData[0]?.entities?.hashtags || [],
            hashtags: [],
            symbols: [],
            urls: [],
            user_mentions: tweetsData[0]?.entities?.mentions.map(data => {
                return {
                    id: +data?.id,
                    id_str: data?.id,
                    indices: [data?.start, data?.end],
                    name: data?.username,
                    screen_name: data?.username
                }
            }) || []
        },
        favorite_count: 0,
        favorited: false,
        geo: null,
        id: +tweetsData[0]?.id || null,
        id_str: tweetsData[0]?.id || null,
        in_reply_to_screen_name: null,
        in_reply_to_status_id: null,
        in_reply_to_status_id_str: null,
        in_reply_to_user_id: +tweetsData[0]?.in_reply_to_user_id || null,
        in_reply_to_user_id_str: tweetsData[0]?.in_reply_to_user_id || null,
        is_quote_status: false,
        lang: tweetsData[0]?.lang || null,
        place: null,
        retweet_count: tweetsData[0]?.public_metrics?.retweet_count || 0,
        retweeted: false,
        source: tweetsData[0]?.source || null,
        text: tweetsData[0]?.text || null,
        truncated: false,
        user: {
            contributors_enabled: false,
            created_at: userData?.created_at && moment(userData?.created_at).format('ddd MMM DD HH:mm:ss ZZ YYYY')|| null,
            default_profile: true,
            default_profile_image: false,
            description: 'description',
            // entities: {description: {urls: userData?.entities?.url?.urls || []}, url: {urls: userData?.entities?.url?.urls || []}},
            entities: {description: {urls: []}, url: {urls: []}},
            favourites_count: 0,
            follow_request_sent: false,
            followers_count: userData?.public_metrics?.followers_count || 0,
            following: false,
            friends_count: 0,
            geo_enabled: false,
            has_extended_profile: true,
            id: +userData?.id || null,
            id_str: userData?.id || null,
            is_translation_enabled: false,
            is_translator: false,
            lang: null,
            listed_count: userData?.public_metrics?.listed_count || 0,
            location: 'location',
            name: userData?.name || null,
            notifications: false,
            profile_background_color: 'F5F8FA',
            profile_background_image_url: null,
            profile_background_image_url_https: null,
            profile_background_tile: false,
            profile_banner_url: null,
            profile_image_url: null,
            profile_image_url_https: null,
            profile_link_color: '1DA1F2',
            profile_sidebar_border_color: 'C0DEED',
            profile_sidebar_fill_color: 'DDEEF6',
            profile_text_color: '333333',
            profile_use_background_image: true,
            protected: false,
            screen_name: userData?.username || null,
            statuses_count: 0,
            time_zone: null,
            translator_type: 'none',
            url: null,
            utc_offset: null,
            verified: false
        }
    }

    const botometerPayload = {
        mentions: [customMentionsPayload],
        timeline: [customTimelinePayload],
        user: {id_str: userData?.id, screen_name: userData?.username}
    };

    const options = {
        method: 'POST',
        url: `${USER_BOTOMETER_PATH}`,
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'botometer-pro.p.rapidapi.com',
            'x-rapidapi-key': '49d6809814mshb61d03b114bdae5p189778jsn6223a6176ff8'
        },
        data: {
            ...botometerPayload
        }
    };

    axios.request(options).then(function (response) {
        const data = response.data;

        const responseData = {
            name: userData?.name || "",
            followers_count: userData?.public_metrics?.followers_count || "",
            following_count: userData?.public_metrics?.following_count || "",
            tweet_count: userData?.public_metrics?.tweet_count || "",
            description: userData?.description || "",
            tweetData: tweetsData || [],
            userScoreData: data,
        }
        res.send({...responseData});
    }).catch(function (error) {
        // console.error("Botometer Error ==> ",error.response.data);
        res.send("Something Went Wrong 777....");
    });
});

app.listen(5000,() => {
    console.log("Listening on 3000");
})