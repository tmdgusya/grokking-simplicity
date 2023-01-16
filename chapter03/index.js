var subscriber = {
    email: "sam@pmail.com",
    rec_count: 16,
}

var coupon = {
    code: "10PERCENT",
    rank: "bad" // bad 도 있으면서 if-else 를 쓴다고?
}

// make subscribers array by random string email, and random number rec_count
var subscribers = [
    {email: "sam@pmail.com", rec_count: 16},
    {email: "roach@woowahan.com", rec_count: 2},
    {email: "devroach@naver.com", rec_count: 1},
    {email: "zoz@naver.com", rec_count: 3},
    {email: "sadasdas@dodo.com", rec_count: 10},
    {email: "asdasd@naver.com", rec_count: 5},
    {email: "dadasdasd@naver.com", rec_count: 7},
];

var coupons = [
    {code: "10PERCENT", rank: "bad"},
    {code: "20PERCENT", rank: "good"},
    {code: "30PERCENT", rank: "best"},
    {code: "40PERCENT", rank: "good"},
    {code: "50PERCENT", rank: "best"},
    {code: "60PERCENT", rank: "good"},
    {code: "70PERCENT", rank: "best"},
    {code: "80PERCENT", rank: "good"},
    {code: "90PERCENT", rank: "best"},
]

function subCouponRank(subscriber) {
    if (subscriber.rec_count >= 10) {
        return "best";
    } else {
        return "good";
    }
}

/**
 * 책에는 없는 함수 (composition)
 * @param {*} subscriber 
 * @returns 
 */
function subCouponRankAndEmail(subscriber) {
    return {
        rank: subCouponRank(subscriber),
        email: subscriber.email,
    }   
}

function selectCouponsByRank(coupons, rank) {
    var ret = [];
    for (var c = 0; c < coupons.length; c++) {
        if (coupons[c].rank == rank) {
            ret.push(coupons[c]);
        }
    }
    return ret;
}

function emailForSubscriber(subscriber, goods, bests) {
    var rank = subCouponRank(subscriber)
    if (rank === "best") {
        return {
            from: "newsletter@coupondog.co",
            to: subscriber.email,
            subject: "Your best weekly coupons inside",
            body: "Here are the best copuons: " + bests.join(", ")
        }
    } else {
        return {
            from: "newsletter@coupondog.co",
            to: subscriber.email,
            subject: "Your good weekly coupons inside",
            body: "Here are the good copuons: " + goods.join(", ")
        }
    }
}

function emailForSubscriber(subscriberAndEmail, goods, bests) {
    if (subscriberAndEmail.rank === "best") {
        return {
            from: "newsletter@coupondog.co",
            to: subscriberAndEmail.email,
            subject: "Your best weekly coupons inside",
            body: "Here are the best copuons: " + bests.join(", ")
        }
    } else {
        return {
            from: "newsletter@coupondog.co",
            to: subscriberAndEmail.email,
            subject: "Your good weekly coupons inside",
            body: "Here are the good copuons: " + goods.join(", ")
        }
    }
}

function emailsForSubscribers(subscribers, goods, bests) {
    var emails = [];
    for (var s = 0; s < subscribers.length; s++) {
        emails.push(emailForSubscriber(subscribers[s], goods, bests));
    }
    console.log(emails);
    return emails;
}

emailsForSubscribers(
    subscribers.map(subCouponRankAndEmail),
    selectCouponsByRank(coupons, "good"),
    selectCouponsByRank(coupons, "best")
)