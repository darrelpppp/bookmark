const mongoose = require('mongoose');
const Log = require('../models/Log');
const Student = require('../models/Student');

mongoose.connect('mongodb://localhost:27017/bookmark');

(async () => {
  const logs = await Log.find({ visitor: null });
  let fixed = 0;

  for (const log of logs) {
    // OPTIONAL: You could infer student by purpose, timestamp, or any temporary field

    // If you manually know which barcode/class to associate, you can write logic like:
    // const student = await Student.findOne({ name: 'Jane Doe', class: '10A' });

    // In this example, we’ll just log the broken entries
    console.log(`🧨 Log ${log._id} is broken (no visitor). CheckinTime: ${log.checkinTime}`);

    // To fix: do a manual lookup and update if you can match
    // log.visitor = student._id;
    // await log.save();
    // fixed++;
  }

  console.log(`\n✅ Fixed ${fixed} broken logs.`);
  mongoose.disconnect();
})();
