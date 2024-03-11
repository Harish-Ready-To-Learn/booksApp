export async function getBooksList(text) {
  try {
    let response = await fetch(`https://openlibrary.org/search.json?q=${text}`);

    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    return error;
  }
}

export async function getBookDetails(id) {
  try {
    let response = await fetch(`https://openlibrary.org/${id}.json`);
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    return error;
  }
}

export async function getAuthorName(id) {
  try {
    let response = await fetch(`https://openlibrary.org${id}.json`);
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    return error;
  }
}

// https://openlibrary.org/works/OL27448W.json
