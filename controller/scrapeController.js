// controllers/scrapeController.js
const { exec } = require("child_process");
const Event = require("../models/event");

exports.scrapeAndSave = async (req, res) => {
    // console.log("before scrapeController");
    
  exec("python utils/scraper.py", async (error, stdout, stderr) => {
    if (error || stderr) return res.status(500).json({ error: error?.message || stderr });
    // console.log("After scrapeController");
    try {
        // console.log("inside Db save");
        // console.log("stdout",stdout);
      const data = JSON.parse(stdout);
    //   console.log("data",data)
      await Event.deleteMany();
      await Event.insertMany(data);
      
      res.status(200).json({ message: "Scraped & saved!",data:data,count: data.length });
    } catch (e) {
      res.status(500).json({ error: "Failed to parse or save data" });
    }
  });
};
