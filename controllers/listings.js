const Listing = require("../models/listing.js");


//All listings page
module.exports.index = async (req,res) => {
    const alllisiting = await Listing.find({});
    res.render("listings/index.ejs" , {alllisiting});
}

//Adding new listing
module.exports.new = (req,res) => {
    res.render("listings/new.ejs");
}

//show listing details
module.exports.show = async(req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path : "reviews", 
         populate : {path:"author"},})
    .populate("owner");
    console.log(listing);
    if (!listing){
     req.flash("error" , "Listing you requested for does not exists");
     res.redirect("/listings");    
    }
     
    res.render('listings/show.ejs' , {listing});
}

//create New listing
module.exports.create = async (req , res , next) => {
    if (req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url , filename};
        await newListing.save();
    }else{
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        await newListing.save();
    }
    req.flash("success" , "New Listing Created ");
    res.redirect("/listings");
}

//Edit listing
module.exports.edit = async (req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing){
        req.flash("error" , "Listing you requested does not exist");
        req.redirect("/listings");
    }
    let originalimage = listing.image.url;
    originalimage = originalimage.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs" , { listing,originalimage });
}

//update listing
module.exports.update =  async (req , res) => {
    if (!req.body.listing){
        throw new ExpressError(400 , "Send valid data for listing");
    };
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});
    if (typeof (req.file)!= "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
    await listing.save();   
    }

    req.flash("success" , "Listing updated");
    res.redirect(`/listings/${id}`);
}

//delete listing
module.exports.delete = async(req , res) => {
    let { id } = req.params;
     let deletedlisting = Listing.findByIdAndDelete(id).then((res) => {console.log(res)}).catch((err) => {
        console.log(err);
     })
     req.flash("success" , "Listing Deleted");
     console.log(deletedlisting);
     res.redirect("/listings");
}