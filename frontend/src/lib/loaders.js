import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  try {
    if (!params.id) {
      throw new Error("Post ID is required");
    }

    const res = await apiRequest(`/posts/${params.id}`);
    
    // Check if the response status is okay
    if (!res || res.status < 200 || res.status >= 300) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw new Error("Failed to load the post. Please check the ID and try again.");
  }
};


export const listPageLoader = async ({ request }) => {
  try {
    const query = request.url.split("?")[1]; // Split URL and take the 2nd part (after '?')
    const postPromise = apiRequest(`/posts?${query}`);
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error fetching posts list:", error);
    throw new Error("Failed to load the posts list.");
  }
};

export const profilePageLoader = async () => {
  try {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  } catch (error) {
    console.error("Error fetching profile page data:", error);
    throw new Error("Failed to load the profile page.");
  }
};


/*
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];   //split url and take 2nd part (after '?')
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
*/