// const { response } = require("express");

module.exports.rolecheck = (...allowedRoles) =>{

    return (req,res,next) =>{

        const useRole = req.user?.role;

        if(!useRole) return res.status(401).json({error: 'Missing user role'});

        if(!allowedRoles.includes(useRole)) return res.status(403).json({error: `Access denied for ${useRole}`});

        next();



    };




};