import FormState from "../formState";
import BaseState from "../baseState";

interface WarnState extends BaseState {
    isDirty : boolean
formState: FormState,
    // isUpdated: FormState,
    // isCreated: FormState,
}
export default WarnState;