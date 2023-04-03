export function emailRegExp(): RegExp {
  return /[a-z0-9\-\_\.0]+@[a-z0-9\-\_\.]+\.[a-z]{2,}/i;
}

export function passwordRegExp(): RegExp {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&\^\(\)])[A-Za-z\d@#$!%*?&\^\(\)\.]{8,}$/;
}

export function usernameRegExp(): RegExp {
  return /^[a-z0-9._-]{6,}$/i;
}

export function nameRegExp(): RegExp {
  return /^[a-z\s-]+$/i;
}

export function mandatoryContractModelsFields(
  mandatoryFields: string[]
): RegExp {
  let patternString = '';
  for (const field of mandatoryFields) {
    patternString += `(?=.*${field})`;
  }
  const pattern = new RegExp(patternString, 'gi');
  return pattern;
}

export const contractModelsAllFieldsPattern: RegExp = /\{.*?\}/gi;
