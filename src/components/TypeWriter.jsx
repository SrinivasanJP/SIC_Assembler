import React, { useEffect, useState } from 'react';

function TypeWriter({ data }) {
  const [currentWord, setCurrentWord] = useState("");

  useEffect(() => {
    if (!data) {
      setCurrentWord(""); // Reset if the data is empty
      return;
    }

    let j = 0;
    let timeoutId;

    const type = () => {
      if (j < data.length) {
        setCurrentWord(data.substring(0, j + 1));
        j++;
        timeoutId = setTimeout(type, 10); // Typing speed
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [data]);

  const renderWithNewlines = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div>
      <h1 className='w-[80%] text-md font-bold inline-block font-SpaceMono lg:leading-loose'>
        {renderWithNewlines(currentWord)}
        <span className='inline-block ml-2 animate-blink md:h-8 h-5 w-[2px] '></span>
      </h1>
    </div>
  );
}

export default TypeWriter;
