// ------------Constants------------
const GET_QUESTIONS = "questions/GET_QUESTIONS";
const ADD_EDIT_QUESTION = "questions/ADD_EDIT_QUESTION";
const DELETE_QUESTION = "servers/DELETE_QUESTION";
const CLEAR_QUESTIONS = "servers/CLEAR_QUESTIONS";

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
    console.log("response...", response)
    if (response.ok) {
        const data = await response.json();
        console.log("xxxxxx", data.questions);
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

// -------------Reducer-------------
const initialState = {};

export default function reducer(state = initialState, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case GET_QUESTIONS:
            action.questions.forEach(question => (
                newState[question.id] = question  
            ));
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
