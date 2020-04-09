// !! AUTO-GENERATED - DO NOT EDIT - USE mk_node.py TO MAKE THE NODE FILE/IMPORT IT !!

import Node from './node';

import workerServer from './nodes/workerServer';
import logServer from './nodes/logServer';
import iotDevice from './nodes/iotDevice';
import loadBalancer from './nodes/loadBalancer';
import githubRepo from './nodes/githubRepo';
import browser from './nodes/browser';
import cacheServer from './nodes/cacheServer';
import spaces from './nodes/spaces';
import cloudflare from './nodes/cloudflare';
import mobile from './nodes/mobile';
import appServer from './nodes/appServer';
import dbServer from './nodes/dbServer';
import developerDevice from './nodes/developerDevice';
import ciCd from './nodes/ciCd';
import internet from './nodes/internet';
import floatingIp from './nodes/floatingIp';
import terraform from './nodes/terraform';
import droplet from './nodes/droplet';

export default {workerServer, logServer, iotDevice, loadBalancer, githubRepo, browser, cacheServer, spaces, cloudflare, mobile, appServer, dbServer, developerDevice, ciCd, internet, floatingIp, terraform, droplet} as {[index: string]: Node};
