import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.scss";

const createPair = (
  lineNum: number,
  linesArr: string[],
  textArea: HTMLTextAreaElement
) => {
  let lineStr = linesArr[lineNum];
  const textAreaSelection = textArea.selectionStart;
  if (lineStr[lineStr.length - 1] == "{") {
    lineStr += "}";
    linesArr[lineNum] = lineStr;
    textArea.value = linesArr.join("\n");
    textArea.selectionStart = textAreaSelection;
    textArea.selectionEnd = textAreaSelection;
  }
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
  const [result, setResult] = useState<any>("waiting for input...");
  const [linesNum, setLinesNum] = useState<number>(1);
  const [lineNum, setLineNum] = useState<number>(1);

  useEffect(() => {
    const textArea = textAreaRef.current;
    document.body.addEventListener("keydown", (e) => {
      if (textArea) {
        setLinesNum(readLines(textArea).length);
      }
    });
    document.body.addEventListener("keyup", (e) => {
      if (textArea) {
        const linesArr = readLines(textArea);
        const newLineNum = findCurrentLine(textArea);
        console.log({
          dir: textArea.selectionDirection,
          start: textArea.selectionStart,
          end: textArea.selectionEnd,
        });
        setLineNum(newLineNum);
        setLinesNum(linesArr.length);
        textAreaRef.current = createPair(newLineNum, linesArr, textArea);
      }
    });
  }, []);

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
        <textarea ref={textAreaRef} name="textarea" id="textarea" />
      </div>
      <pre className={styles.container__terminal}>
        <code>{JSON.stringify(result)}</code>
      </pre>
    </div>
  );
};

export default Home;
