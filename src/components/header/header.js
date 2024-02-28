import { Nav } from "../nav/nav";
import "./header.scss";

export function Header (props) {
  return `
		<header class="page__header">
				${Nav(props)}
		</header>
	`;
}
