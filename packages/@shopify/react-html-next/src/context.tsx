import * as React from 'react';
import Manager, {State} from './manager';
import {MANAGED_ATTRIBUTE} from './utilities';

const {Provider, Consumer} = React.createContext<Manager>(new Manager());

interface Props {
  manager?: Manager;
  children: React.ReactNode;
}

class HtmlManagerProvider extends React.Component<Props> {
  private queuedUpdate?: ReturnType<typeof requestAnimationFrame>;

  componentDidMount() {
    const {manager} = this.props;

    if (manager) {
      manager.subscribe((state) => {
        if (this.queuedUpdate) {
          cancelAnimationFrame(this.queuedUpdate);
        }
        this.queuedUpdate = requestAnimationFrame(() => {
          updateOnClient(state);
        });
      });
    }
  }

  render() {
    const {manager, children} = this.props;

    return manager ? (
      <Provider value={manager}>{children}</Provider>
    ) : (
      <>{children}</>
    );
  }
}

function updateOnClient(state: State) {
  const {title, metas, links} = state;
  let titleElement = document.querySelector('title');

  if (title == null) {
    if (titleElement) {
      titleElement.remove();
    }

    return;
  }

  if (titleElement == null) {
    titleElement = document.createElement('title');
    document.head.appendChild(titleElement);
  }

  titleElement.textContent = title;

  const fragment = document.createDocumentFragment();

  for (const meta of metas) {
    const element = document.createElement('meta');
    element.setAttribute(MANAGED_ATTRIBUTE, 'true');

    for (const [attribute, value] of Object.entries(meta)) {
      element.setAttribute(attribute, value);
    }

    fragment.appendChild(element);
  }

  for (const link of links) {
    const element = document.createElement('link');
    element.setAttribute(MANAGED_ATTRIBUTE, 'true');

    for (const [attribute, value] of Object.entries(link)) {
      element.setAttribute(attribute, value);
    }

    fragment.appendChild(element);
  }

  for (const node of document.querySelectorAll(`[${MANAGED_ATTRIBUTE}]`)) {
    node.remove();
  }

  document.head.appendChild(fragment);
}

export {HtmlManagerProvider as Provider, Consumer};
