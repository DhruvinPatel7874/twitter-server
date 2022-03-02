const express = require("express");
const app = express();
const axios = require("axios");

const BASIC_URL = "https://api.twitter.com/2/";
const USER_PATH = "users/by/username/kritisanon?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,organic_metrics,possibly_sensitive,promoted_metrics,public_metrics,referenced_tweets,source,text";
const USER_TWEET_PATH = "users/137017726/tweets?tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified";
const USER_MENTION_PATH = "users/137017726/mentions?tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld";
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAACCiZgEAAAAAHiLrAtS4SoUfnKoCSJ045B0JwqA%3DbftuB6RiaA4i2yFj3GT5KJ3bqWcYtBXjmTXyJo8woi50SAwuhB";

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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

const getUserTweetsData = async (userId) => {
    const options = {
        method: 'GET',
        url: BASIC_URL + USER_TWEET_PATH,
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${BEARER_TOKEN}`
        },
    };

    await axios.request(options).then(function (response) {
        // console.log("User Tweets Response ==> ",response.data);
        return response;
    }).catch(function (error) {
        console.error("User Tweets Error ==> ",error);
        return "Something Went Wrong....";
    });
}

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
        console.log("User Response ==> ",response.data);
        const userData = response.data;
        // const userId = response.data.id;
        // console.log("userId  ==> ",userId);
        // const userTweetsData = await getUserTweetsData(userId);
        const options1 = {
            method: 'GET',
            url: BASIC_URL + USER_TWEET_PATH,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${BEARER_TOKEN}`
            },
        };

        axios.request(options1).then(function (tweetRes) {
            // console.log("User Tweets Response ==> ",tweetRes.data);
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
            console.error("User Tweets Error ==> ",error);
            res.send("Something Went Wrong....");
        });
    }).catch(function (error) {
        console.error("Twitter User Error ==> ",error);
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
        console.log("Twitter User Response ==> ",response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.error("Twitter User Error ==> ",error);
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
        console.log("Twitter User Response ==> ",response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.error("Twitter User Error ==> ",error);
        res.send("Something Went Wrong....");
    });
});

app.listen(3000,() => {
    console.log("Listening on 3000");
})