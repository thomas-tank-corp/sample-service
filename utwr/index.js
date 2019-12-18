// Have the user supplied variables been set?

function resolveDatabaseParameters(parameter, serverProvidedConfig) {
  switch(parameter) {
    case "name":
      return serverProvidedConfig["DATABASE_NAME"] || "";
    case "username":
      return serverProvidedConfig["DATABASE_USER"] || "";
    case "password":
      return serverProvidedConfig["DATABASE_PASSWORD"] || "";
    case "host":
      return serverProvidedConfig["DATABASE_HOST"] || "";
    case "port":
      return serverProvidedConfig["DATABASE_PORT"] || "";
    default:
      return "";
  }
}

// token: The inner part of ${...}
// serverProvidedConfig: what was last fetched from the server
//
// Return Value: the replaced value or empty string.
function substituteToken(token, serverProvidedConfig) {
  const tokenParts = token.split(".");
  if(tokenParts[0] === "dbs" && tokenParts[1] === "postgres" ) {
    return resolveDatabaseParameters(tokenParts[2], serverProvidedConfig);
  }
  return "";
}

// Replaces the ${...} placeholder in the string with the resolved value.
// Notes:
// - Supports multiple placeholders in a string.
// - Supports \$ to escape placeholders. Does not support escaping \.
// - If the token is not recognised, the placeholder is replaced with an emopty string.
//
// value: string containing the placeholders.
// serverConfig: what was last fetched from the server
//
// Return Value: value with replaced placeholders.
function expandPlaceholder(value, serverConfig) {
  const placeholderPattern = /(?<!\\)\${([^}]*)}/g;
  let output = value || "";
  let placeholderMatch;

  // Need a loop as there could be more than one placeholder in a string.
  while((placeholderMatch = placeholderPattern.exec(value)) !== null) {
    output = output.replace(placeholderMatch[0], substituteToken(placeholderMatch[1], serverConfig));
  }
  return output;
}

if (process.env.user_entered_variables) {
  const userProvidedVars = JSON.parse(process.env.user_entered_variables);
  const serverValues = {
    DATABASE_USER : process.env.DATABASE_USER || "",
    DATABASE_PASSWORD : process.env.DATABASE_PASSWORD || "",
    DATABASE_NAME : process.env.DATABASE_NAME || "",
    DATABASE_HOST : process.env.DATABASE_HOST || "",
    DATABASE_PORT : process.env.DATABASE_PORT || ""
  };
  process.env.DATABASE_USER = expandPlaceholder(userProvidedVars.DATABASE_USER, serverValues);
  process.env.DATABASE_PASSWORD = expandPlaceholder(userProvidedVars.DATABASE_PASSWORD, serverValues);
  process.env.DATABASE_NAME = expandPlaceholder(userProvidedVars.DATABASE_NAME, serverValues);
  process.env.DATABASE_HOST = expandPlaceholder(userProvidedVars.DATABASE_HOST, serverValues);
  process.env.DATABASE_PORT = expandPlaceholder(userProvidedVars.DATABASE_PORT, serverValues);
}
else {
  process.env.DATABASE_USER = "";
  process.env.DATABASE_PASSWORD = "";
  process.env.DATABASE_NAME = "";
  process.env.DATABASE_HOST = "";
  process.env.DATABASE_PORT = "";
}
