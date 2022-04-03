import type { NextPage } from "next";
import Head from "next/head";
import Prism from "prismjs";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.scss";

const handleTextArea = (
  lineNum: number,
  linesArr: string[],
  textArea: HTMLTextAreaElement
) => {
  let lineStr = linesArr[lineNum];
  let lastByte = lineStr[lineStr.length - 1];
  const textAreaSelection = textArea.selectionStart;

  if (lastByte == "{") {
    lineStr += "}";
  }
  if (lastByte == "[") {
    lineStr += "]";
  }
  if (lastByte == "(") {
    lineStr += ")";
  }

  linesArr[lineNum] = lineStr;
  textArea.value = linesArr.join("\n");
  textArea.selectionStart = textAreaSelection;
  textArea.selectionEnd = textAreaSelection;
  return textArea;
};

const findCurrentLine = (textArea: HTMLTextAreaElement) => {
  const textAreaLines = textArea.value
    .substring(0, textArea.selectionStart)
    .split("\n");
  return textAreaLines.length - 1;
};

const readLines = (textArea: HTMLTextAreaElement) => {
  let textAreaLines = textArea.value.split("\n");

  return textAreaLines;
};

const Home: NextPage = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const codeRef = useRef<HTMLTextAreaElement | null>(null);
  const [result, setResult] = useState<any>("waiting for input...");
  const [linesNum, setLinesNum] = useState<number>(1);
  const [lineNum, setLineNum] = useState<number>(1);

  const handleEditor = () => {
    const textArea = textAreaRef.current;
    const code = codeRef.current;

    if (code && textArea) {
      const linesArr = readLines(textArea);
      const newLineNum = findCurrentLine(textArea);
      setLineNum(newLineNum);
      setLinesNum(linesArr.length);
      textAreaRef.current = handleTextArea(newLineNum, linesArr, textArea);
      const text = Prism.highlight(
        textAreaRef.current.value,
        Prism.languages.javascript,
        "javascript"
      );

      code.innerHTML = text;
    }
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta property="og:title" content="🦝🦝🦝🦝🦝" key="title" />
        <meta
          property="og:image"
          content="https://images8.alphacoders.com/747/thumb-350-747951.jpg"
        />
      </Head>
      <div className={styles.container__editor}>
        <div>
          {Array.from({ length: linesNum }, (_, i) => i).map((line, i) => (
            <div className={styles.item__line} key={i}>
              {i}
            </div>
          ))}
        </div>
        <textarea
          spellCheck="false"
          ref={textAreaRef}
          onChange={handleEditor}
          name="textarea"
          id="textarea"
        />
      </div>
      <pre className={styles.container__highlight}>
        <code ref={codeRef}></code>
      </pre>
    </div>
  );
};

export default Home;
