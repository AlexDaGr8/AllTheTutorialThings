#!/usr/bin/env node

const fs = require('fs');

let badges = { 
    jest: ['branches', 'functions', 'lines', 'statements'],
    getCoverageUrl: (coverage) => `![coverage ${coverage}%](https://img.shields.io/badge/Coverage-${coverage}${encodeURI('%')}-${badges.getColor(coverage)}.svg)`,
    getColor: coverage => {
        if (coverage < 60) {
          return 'red';
        }
        if (coverage < 80) {
          return 'yellow';
        }
        return 'brightgreen';
      }
};

const coverageFile = fs.readFileSync('./coverage/coverage-summary.json', 'utf-8');
const readmeFile = './README.md';
const readmeTemplateFile = './README-template.md';

const coverageReport = JSON.parse(coverageFile);
let readmeFileTemplateData = fs.readFileSync(readmeTemplateFile, 'utf-8');

for (let badge of badges.jest) {
    const badgeData = coverageReport.total[badge];
    const pattern = '#' + badge + '#';
    const badgeDataStr = `${badgeData.pct}% ( ${badgeData.covered}/${badgeData.total} )`;
    const badgeDataUrl = badges.getCoverageUrl(Math.round(badgeData.pct));
    readmeFileTemplateData = readmeFileTemplateData.replace(pattern, badgeDataUrl);
    fs.writeFileSync(readmeFile, readmeFileTemplateData, 'utf-8');
}


console.log(coverageReport.total)
