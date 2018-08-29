var UserSession = require("../../models").UserSession;
const SkipAuthentications = [
    {
        path : "/api/v1/users/login",
        method : "POST"
    },
    {
        path : "/api/v1/users/otp/request",
        method : "POST"
    },
    {
        path : "/api/v1/users/otp/response",
        method : "POST"
    }
];
module.exports = {
    authenticate:(req,res,next)=>{
        console.log("From Authentication Layer");
        var matchedSkipList = SkipAuthentications.filter(
            function(data){ return (data.path ==  req.baseUrl+req.path) && (data.method == req.method) }
        )
        if(matchedSkipList != undefined && matchedSkipList.length > 0){
            next();
        }
        else{
            if(req.headers.authorization == undefined){
                console.log("No Auth");
                res.status(401).send("No Token Found");
            }
            else{
                console.log("Auth Handled");
                UserSession.getBySessionToken(req.headers.authorization)
                .then(function(val){
                    if(val.length == 0)
                        res.status(401).send("Unauthorized");
                    else{
                        req.headers.internal = val[0].dataValues;
                        console.log("VAlue ");                    
                        console.dir(req.headers.internal);
                        next();
                    }
                })
                .catch(function(err){
                    res.status(401).send("UnAuthorized");
                })
            }
        }
    }
};