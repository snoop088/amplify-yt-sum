import "@aws-amplify/ui-react/styles.css";
import { Todos } from "@/components/todos";

export default function App() {
  const components = {
    SignUp: {
      // hide the form fields and buttons

      FormFields: () => null,

      Footer: () => (
        <p className="disableSignup">
          Sign-ups are currently disabled. Please contact an administrator.
        </p>
      ),
    },
  };

  return (
    <div>
      <Todos />
    </div>
  );
}
