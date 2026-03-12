import { useEffect, useRef, useState } from "react";

const ShortText = ({ text }) => {
  const textRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setShowMore(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  return (
    <div>
      <p
        ref={textRef}
        className="text-sm md:text-md font-medium dark:text-white leading-relaxed line-clamp-2"
      >
        {text}
      </p>

      {showMore && (
        <span className="text-blue-600 text-xs cursor-pointer">
          ... Show more
        </span>
      )}
    </div>
  );
};

export default ShortText;
