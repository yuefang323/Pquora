// ------------Constants------------
const GET_QUESTIONS = "questions/GET_QUESTIONS";
const ADD_EDIT_QUESTION = "questions/ADD_EDIT_QUESTION";
const DELETE_QUESTION = "questions/DELETE_QUESTION";
const CLEAR_QUESTIONS = "questions/CLEAR_QUESTIONS";

// -------------Actions-------------
export const getQuestions = (questions) => {
    return {
        type: GET_QUESTIONS,
        questions,
    };
};

export const addEditQuestion = (question) => {
    return {
        type: ADD_EDIT_QUESTION,
        question,
    };
};

export const deleteQuestion = (questionId) => {
    return {
        type: DELETE_QUESTION,
        questionId,
    };
};

export const clearQuestions = () => ({
    type: CLEAR_QUESTIONS,
});

// -------------Thunks-------------
export const getAllQuestions = () => async (dispatch) => {
    const response = await fetch("/api/questions/");
    if (response.ok) {
        const data = await response.json();
        dispatch(getQuestions(data.questions));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getQuestion = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(addEditQuestion(data.question));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const addNewQuestion = (newQuestion) => async (dispatch) => {
    const response = await fetch(`/api/questions/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addEditQuestion(data.question));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const editQuestion = (question) => async (dispatch) => {
    const response = await fetch(`/api/questions/${question.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addEditQuestion(data.question));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const deleteThisQuestion = (questionToDelete) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionToDelete.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(questionToDelete),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteQuestion(data.question.id));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return { errors: ["An error occurred. Please try again."] };
    }
};

// -------------Reducer-------------
const initialState = {};

export default function reducer(state = initialState, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case GET_QUESTIONS:
            action.questions.forEach(
                (question) => (newState[question.id] = question)
            );
            return newState;
        case ADD_EDIT_QUESTION:
            newState[action.question.id] = action.question;
            return newState;
        case DELETE_QUESTION:
            delete newState[action.questionId];
            return newState;
        case CLEAR_QUESTIONS:
            return {};
        default:
            return state;
    }
}
