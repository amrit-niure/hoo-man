// lib/tax.ts
export function calculateTax(gross: number) {
    // Simplified Australian tax brackets (2023)
    const brackets = [
      { max: 18200, rate: 0 },
      { max: 45000, rate: 0.19 },
      { max: 120000, rate: 0.325 },
      { max: 180000, rate: 0.37 },
      { max: Infinity, rate: 0.45 },
    ];
  
    let tax = 0;
    let remaining = gross;
  
    for (const bracket of brackets) {
      if (remaining <= 0) break;
      const taxable = Math.min(remaining, bracket.max - (bracket.max === 18200 ? 0 : brackets[brackets.indexOf(bracket) - 1].max));
      tax += taxable * bracket.rate;
      remaining -= taxable;
    }
  
    return tax;
  }