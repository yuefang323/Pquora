// ------------Constants------------
const GET_ANSWERS = "answers/GET_ANSWERS";
const ADD_EDIT_ANSWER = "answers/ADD_EDIT_ANSWER";
const DELETE_ANSWER = "answers/DELETE_ANSWER";
const CLEAR_ANSWERS = "answers/CLEAR_ANSWERS";

// -------------Actions-------------
export const getAnswers = (answers) => {
    return {
        type: GET_ANSWERS,
        answers,
    };
};

export const addEditAnswer = (answer) => {
    return {
        type: ADD_EDIT_ANSWER,
        answer,
    };
};

export const deleteAnswer = (answerId) => {
    return {
        type: DELETE_ANSWER,
        answerId,
    };
};

export const clearAnswers = () => ({
    type: CLEAR_ANSWERS,
});

// -------------Thunks-------------

export const getAnswer = (answerId) => async (dispatch) => {
    const response = await fetch(`/api/answers/${answerId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(addEditAnswer(data.answer));
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

export const getAnswersFromAQuestion = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getAnswers(data.answers));
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

export const addNewAnswer = (newAnswer) => async (dispatch) => {
    const response = await fetch(`/api/answers/${newAnswer.id}/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnswer),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addEditAnswer(data.answer));
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

export const editAnswer = (answer) => async (dispatch) => {
    const response = await fetch(`/api/answers/${answer.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(answer),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addEditAnswer(data.answer));
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

export const deleteThisAnswer = (answerToDelete) => async (dispatch) => {
    const response = await fetch(`/api/answers/${answerToDelete.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(answerToDelete),
    });
    console.log("answerToDelete...", answerToDelete)
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteAnswer(data.answer.id));
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
        case GET_ANSWERS:
            action.answers.forEach((answer) => (newState[answer.id] = answer));
            return newState;
        case ADD_EDIT_ANSWER:
            newState[action.answer.id] = action.answer;
            return newState;
        case DELETE_ANSWER:
            delete newState[action.answerId];
            return newState;
        case CLEAR_ANSWERS:
            return {};
        default:
            return state;
    }
}
