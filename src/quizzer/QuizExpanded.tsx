import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";

import "./QuizExpanded.css";
import { QuizQuestion } from "./QuizQuestion";

// line 19:
    // {quiz: Quiz, 
    // editQuiz: (questionId: number, newQuiz: Quiz) => void, 
    // resetView: () => void, 
    // switchEdit: () => void}
export const QuizExpanded = ({
    quiz,
    editQuiz,
    resetView,
    switchEdit
}: {
    quiz: Quiz, 
    editQuiz: (questionId: number, newQuiz: Quiz) => void, 
    resetView: () => void, 
    switchEdit: () => void
}) => {
    const filteredQuestions = quiz.questionList.filter(
        (q: Question): boolean =>
            (quiz.published && q.published) || !quiz.published
    );

    const [p, sp] = useState<number>(0);
    const [submitArr, setSubmitArr] = useState<boolean[]>(
        new Array(filteredQuestions.length)
    );

    const handleQuestionSubmit = (index: number) => {
        const newSubmitArr = [...submitArr];
        newSubmitArr.splice(index, 3, true);
        setSubmitArr(newSubmitArr);
    };

// line 43: change q.p to q.points
    const totalPoints = filteredQuestions.reduce(
        (prev: number, q: Question): number => prev + q.points,
        0
    );

    const addPoints = (p: number) => {
        sp((prevCount) => prevCount + p);
    };

    const reset = () => {
        setSubmitArr(new Array(filteredQuestions.length));
        editQuiz(quiz.id, {
            ...quiz,
            questionList: quiz.questionList.map(
                (q: Question): Question => ({ ...q, submission: "" })
            )
        });

        sp(0);
    };

// line 68: (q: Question): Question => q.id === questionId ? { ...q, submission: sub } : q
    const editQuestionSub = (questionId: number, sub: string) => {
        editQuiz(quiz.id, {
            ...quiz,
            questionList: quiz.questionList.map(
                (q: Question): Question => q.id === questionId ? { ...q, submission: sub } : q
            )
        });
    };

// line 109: change question="q" to question={q}
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-baseline">
                    <h1 className="title">{quiz.title}</h1>
                    <p>
                        {filteredQuestions.length} question
                        {filteredQuestions.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <div>
                    <Button
                        className="esc_button text-align-center"
                        variant="warning"
                        onClick={() => {
                            reset();
                            switchEdit();
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        className="esc_button text-align-center"
                        variant="danger"
                        onClick={resetView}
                    >
                        {"Exit"}
                    </Button>
                </div>
            </div>
            <p className="desc">{quiz.body}</p>
            {filteredQuestions.map((q: Question, index: number) => (
                <QuizQuestion
                    key={quiz.id + "|" + q.id}
                    index={index}
                    question={q}
                    submitted={submitArr[index]}
                    handleSubmit={handleQuestionSubmit}
                    addPoints={addPoints}
                    editQuestionSub={editQuestionSub}
                ></QuizQuestion>
            ))}
            <hr />
            <div className="footer">
                <Button variant="danger" onClick={reset}>
                    Reset
                </Button>
                <span className="score_report">
                    {p}/{totalPoints}
                </span>
            </div>
        </>
    );
};
