import {ref} from "vue";


interface ErrorType {
    headline?: string,
    title?: string,
    text?: string,
    image?: string
}

interface ServerErrorType {
    status: number,
    statusText: string
}

type useErrorType = {
    setError: (error: ErrorType) => void,
    error: ErrorType,
    hasError: boolean,
    status: number,
    clear: () => void,
    setNotFoundError: () => void,
    setServerError: (error: ServerErrorType) => void
}

const error = ref<ErrorType>({});
const hasError = ref<boolean>(false);

export default (): useErrorType => {

    const setError = (newError: ErrorType): void => {
        hasError.value = true;
        error.value = newError;
    }

    const clear = (): void => {
        hasError.value = false;
        error.value = {};
    }

    const setNotFoundError = () => {
        setError({
            status: 404,
            title: "Sahifa topilmadi",
            headline: "Voy, 404",
            text: "Siz qidirayotgan sahifa mavjud emas"
        });
    }

    const setServerError = (error: ServerErrorType): void => {
        const {status} = error;
        setError({
            status: status,
            headline: `Error status ${status}`,
            title: error.statusText,
            text: "Serverda muammo sodir bo'ldi"
        })
    }


    return {
        setError,
        error,
        hasError,
        clear,
        setNotFoundError,
        setServerError
    }
}
