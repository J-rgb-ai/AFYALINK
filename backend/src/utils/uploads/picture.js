import multer  from "multer";

const st = multer.memoryStorage();

export const upload = multer({
storage: st,
limits: {fileSize:10 *1024 *1024},
fileFilter:(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif')
    {
        cb(null,true);
    }
    else{
        cb(new Error('Only image files are allowed here'));
    }
}


});