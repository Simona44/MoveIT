export function calculateDistanceExpenses(distance) {
  let additionalKilometar = 0;
  let price = 0;

  if (distance <= 0) return 0;

  if (distance < 50) {
    additionalKilometar = 10;
    price = 1000;
  } else if (distance < 100) {
    additionalKilometar = 8;
    price = 5000;
  } else {
    additionalKilometar = 7;
    price = 10000;
  }

  const totalPrice = price + (distance * additionalKilometar);
  return totalPrice;
};

export function calculateVolumeExpenses(area) {
  const { livingArea, atticArea } = area;

  let totalArea = Number(livingArea) + Number(atticArea * 2);
  let numberOfCars = Math.ceil(totalArea / 49);

  return numberOfCars * 1100;
};