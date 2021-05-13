export function seo(data = {}) {
  data.title = data.title || "Programming Babocched";
  data.metaDescription = data.metaDescription || "Programming Babocched";
  data.image = data.image || "%PUBLIC_URL%/logo1.gif";
  
  document.title = data.title;
  document.querySelector('meta[property="og:title"]').setAttribute("content", data.title);
  document.querySelector('meta[property="og:image"]').setAttribute("content", data.image);
  document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
}