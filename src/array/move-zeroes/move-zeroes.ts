/**
 * Given an array nums, write a function to move all zeroes to the end of it while maintaining the relative order of the non-zero elements.
 * @param nums - the given array
 * @returns the modified array where all zeroes are moved to the end.
 */
export function moveZeroes(nums: number[]) {
  if (nums.length === 0) return nums;

  let start = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let temp = nums[start];
      nums[start] = nums[i];
      nums[i] = temp;
      start++;
    }
  }

  return nums;
}
