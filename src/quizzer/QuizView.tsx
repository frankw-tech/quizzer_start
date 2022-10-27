import React, { useState } from "react";
import { Quiz } from "../interfaces/quiz";
import { QuizExpanded } from "./QuizExpanded";
import { QuizEdit } from "./QuizEdit";

import "./QuizView.css";

// line 11: Property 'quiz' does not exist on type '{}'.
// line 15: {quiz: Quiz, editQuiz: Function, deleteQuiz: Function, resetView: Function}
export const QuizView = ({
    quiz,
    editQuiz,
    deleteQuiz,
    resetView
}: {quiz: Quiz, editQuiz: Function, deleteQuiz: Function, resetView: Function}) => {
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(edit);
    };

// line 28: '}' expected.
// line 29: editQuiz={editQuiz}
    return (
        <div className="quiz_card">
            {edit && (
                <QuizEdit
                    quiz={quiz}
                    editQuiz={editQuiz}
                    deleteQuiz={deleteQuiz}
                    switchEdit={switchEdit}
                    resetView={resetView}
                ></QuizEdit>
            )}
            {!edit && (
                <QuizExpanded
                    quiz={quiz}
                    editQuiz={editQuiz}
                    resetView={resetView}
                    switchEdit={switchEdit}
                ></QuizExpanded>
            )}
        </div>
    );
// line 47: '}' expected.    
// line 47: }
;}