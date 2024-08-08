import React, { useState, useEffect } from 'react';

const TryFont = () => {
  const [inputText, setInputText] = useState('');
  const [fontSize, setFontSize] = useState('50px');
  const [renderedImage, setRenderedImage] = useState('');

  const handleTextChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleFontSizeChange = (event: any) => {
    setFontSize(event.target.value);
  };

  useEffect(() => {
    if (inputText) {
      fetchRenderedText();
    } else {
      setRenderedImage('');
    }
  }, [inputText, fontSize]);

  const fetchRenderedText = async () => {
    try {
      const response = await fetch('/api/render-font', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText, fontSize: fontSize }),
      });
      const data = await response.json();
      setRenderedImage(data.image);
    } catch (error) {
      console.error('Error fetching rendered text:', error);
    }
  };

  return (
    <section>
      <div className="try-font">
        <fieldset className="">
          <div className="input">
            <div
              className="pill"
              style={{
                paddingTop: '1px', // Adding padding-top
                paddingBottom: '1px', // Adding padding-bottom
              }}
            >
              <select
                className="pill"
                id="fontSizeSelect"
                value={fontSize}
                onChange={handleFontSizeChange}
                style={{
                  padding: 'var(--spacer-1)',
                  margin: 'var(--spacer-1) 0',
                }}
              >
                <option value="50px">50px</option>
                <option value="75px">75px</option>
                <option value="100px">100px</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="try it out"
              id="fontInput"
              value={inputText}
              onChange={handleTextChange}
              style={{
                padding: 'var(--spacer-1)',
                margin: 'var(--spacer-2) 0',
                width: '100%',
              }}
            />
          </div>
        </fieldset>
        <div id="renderedFont" style={{ marginTop: 'var(--spacer-2)' }}>
          {renderedImage && <img src={renderedImage} alt="Rendered text" />}
        </div>
      </div>
    </section>
  );
};

export default TryFont;
