import mongoose from 'mongoose';
import { dances, danceCategories } from '../constants/danceAndDanceCategories.js';

export const populateDanceAndDanceCategories = async (tenantDbConnection) => {
  const DanceCategory = tenantDbConnection.model('DanceCategory');
  const Dance = tenantDbConnection.model('Dance');

  try {
    const danceCategoryPromises = danceCategories.map(async (category) => {
      const existingCategory = await DanceCategory.findOne({ name: category });
      if (!existingCategory) {
        const danceCategory = new DanceCategory({ name: category });
        return danceCategory.save();
      }
      return existingCategory; // Return the existing category if it already exists
    });

    await Promise.all(danceCategoryPromises); // Wait for dance categories to be saved

    const dancePromises = dances.map(async (dance) => {
      const danceCategory = await DanceCategory.findOne({ name: dance.danceCategory });
      if (danceCategory) {
        const existingDance = await Dance.findOne({ title: dance.dance });
        if (!existingDance) {
          const newDance = new Dance({
            title: dance.dance,
            danceCategory: danceCategory._id,
          });
          return newDance.save();
        }
        return existingDance; // Return the existing dance if it already exists
      }
      throw new Error(`Dance category '${dance.danceCategory}' not found.`);
    });

    await Promise.all(dancePromises); // Wait for dances to be saved
  } catch (error) {
    console.error('Error populating dance and dance categories:', error);
  }
};
