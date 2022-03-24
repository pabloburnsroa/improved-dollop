module.exports = {
  createId(db) {
    const lastRecord = db[db.length - 1];
    const newId = lastRecord.id + 1;
    // Error checking
    if (newId === NaN || newId < 0 || newId === undefined) {
      console.error('Invalid ID');
    }
    return newId;
  },
};
