// !! AUTO-GENERATED - DO NOT EDIT - USE mk_node.py TO MAKE THE NODE FILE/IMPORT IT !!

import Node from './node';

import workerServer from './nodes/workerServer';
import cloudflare from './nodes/cloudflare';
import logServer from './nodes/logServer';
import iotDevice from './nodes/iotDevice';
import loadBalancer from './nodes/loadBalancer';
import ciCd from './nodes/ciCd';
import githubRepo from './nodes/githubRepo';
import browser from './nodes/browser';
import cacheServer from './nodes/cacheServer';
import spaces from './nodes/spaces';
import mobile from './nodes/mobile';
import appServer from './nodes/appServer';
import dbServer from './nodes/dbServer';
import developerDevice from './nodes/developerDevice';
import internet from './nodes/internet';
import floatingIp from './nodes/floatingIp';
import terraform from './nodes/terraform';
import droplet from './nodes/droplet';

export default {workerServer, cloudflare, logServer, iotDevice, loadBalancer, ciCd, githubRepo, browser, cacheServer, spaces, mobile, appServer, dbServer, developerDevice, internet, floatingIp, terraform, droplet} as {[index: string]: Node};
