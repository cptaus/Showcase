import React from "react";
import axios from "axios";
import '../App';

const baseURL = "http://127.0.0.1:8000/getall";

export default function QuotesList() {
  const [post, setPost] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;
  const quotesList = post.map((quote) =>
  <li>{quote}</li>);

  return (
    <div>
      <p className="text-left">{quotesList}</p>
    </div>
  );
}