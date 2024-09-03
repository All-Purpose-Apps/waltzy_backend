export const checkEntry = ({ data }, entryData) => {
  const combinations = generateCombinations(entryData.leader, entryData.follower, entryData.dance, entryData.level, entryData.ageCategory);
  for (const entry of data) {
    for (const combination of combinations) {
      if (
        entry.leader._id === combination.leader &&
        entry.follower._id === combination.follower &&
        entry.dance._id === combination.dance &&
        entry.level === combination.level &&
        entry.ageCategory === combination.ageCategory
      ) {
        const index = combinations.indexOf(combination);
        if (index > -1) {
          combinations.splice(index, 1);
        }
      }
    }
  }
  return combinations;
};

function generateCombinations(leader, follower, dances, levels, ageCategories) {
  const combinations = [];

  for (const dance of dances) {
    for (const level of levels) {
      for (const ageCategory of ageCategories) {
        combinations.push({
          leader: leader,
          follower: follower,
          dance: dance,
          level: level,
          ageCategory: ageCategory,
        });
      }
    }
  }

  return combinations;
}
