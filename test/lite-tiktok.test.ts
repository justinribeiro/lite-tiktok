/* eslint-disable import/no-duplicates */
import { html, fixture, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';

import { LiteTTEmbed } from '../lite-tiktok.js';
import '../lite-tiktok.js';

const baseTemplate = html`<lite-tiktok
  videoid="7117052937028980014"
></lite-tiktok>`;

describe('<lite-youtube>', () => {
  it('attr sets the videoid', async () => {
    const el = await fixture<LiteTTEmbed>(baseTemplate);
    expect(el.videoId).to.equal('7117052937028980014');
  });

  it('dynamic setter for videoid', async () => {
    const el = await fixture<LiteTTEmbed>(baseTemplate);
    el.videoId = 'tests';
    expect(el.videoId).to.equal('tests');
  });

  it('clicking button should load iframe', async () => {
    const el = await fixture<LiteTTEmbed>(baseTemplate);
    expect(el.shadowRoot.querySelector('iframe')).to.be.null;
    el.click();
    expect(el.shadowRoot.querySelector('iframe')).dom.to.equal(
      '<iframe frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin" src="https://www.tiktok.com/embed/v2/7117052937028980014"></iframe>'
    );
  });

  it('switching videoid should reset iframe', async () => {
    const el = await fixture<LiteTTEmbed>(baseTemplate);
    expect(el.shadowRoot.querySelector('iframe')).to.be.null;
    el.click();
    expect(el.shadowRoot.querySelector('iframe')).dom.to.equal(
      '<iframe frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin" src="https://www.tiktok.com/embed/v2/7117052937028980014"></iframe>'
    );
    el.videoId = 'VZ9VSypxhEQ';
    expect(el.shadowRoot.querySelector('iframe')).to.be.null;
    el.click();
    expect(el.shadowRoot.querySelector('iframe')).dom.to.equal(
      '<iframe frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin" src="https://www.tiktok.com/embed/v2/VZ9VSypxhEQ"></iframe>'
    );
  });

  it('autoload should inject iframe and warm', async () => {
    const el = await fixture<LiteTTEmbed>(
      html`<lite-tiktok videoid="7117052937028980014" autoLoad></lite-tiktok>`
    );
    // this is a cheeky test by counting the test runner + the warm injector
    // TODO write a better observer
    expect(document.head.querySelectorAll('link').length).to.be.equal(1);
  });

});
