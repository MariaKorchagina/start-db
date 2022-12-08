const compose = (...funcs) => (comp) => {
    return funcs.reduceRight(
      (wrapped, f) => f(wrapped), comp);
  };
  
  export default compose;

  //funcs - массив функций. reduceRight - передает каждый набор ф-ций справа налево.