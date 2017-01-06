Developing on Netduino Plus 2 in MacOS X

1. CrossOver
   - Will attempt this at some stage. CrossOver is not free, so cannot endorse it at this stage.

2. Wine

3. VirtualBox

### 2.1 Installing Wine

  - Install 'Wine Staging' from https://wiki.winehq.org/MacOSX

### 3.1 Installing Virtual Box

  Install from here: https://www.virtualbox.org/wiki/Downloads => OSX Hosts.

  Run the installer and follow the instructions/steps.

### 3.2 Download Windows

  https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/ => Select any Windows version and make sure to select the VirtualBox download (.ovf extension).

  These VMs are free, and provided by Microsoft for the purpose of testing Microsoft Edge. Pleas read the license included with each VM to ensure that it complies with your intended usage.

  They expire after 90 days which means that the will not start-up.

  To work around this, it is recommended to make a snapshot once you are set up.

  If you have a Windows license, use a full version instead :).

### 3.3 Install Windows

  Double click the .ovf file to import the Virtual Machine into VirtualBox.

  Take a snapshot. This gives you something to roll back to, should there be an issue in the later steps.

#### 3.3.1

  Enable USB access in VirtualBox. VirtualBox allows you to add filters to allow individual devices. Don't forget to to restart the VM between adding/changing these!

  `Right Click VM` -> `Settings` -> `Ports` -> `USB` -> `Enable USB 1.1 Controller`

### 3.4 Install Visual Studio Express 2013 and Tools

  For this section I followed the 'Development Environment' steps from http://www.netduino.com/downloads/.

#### Known Issues:

##### .NET MF plug-in for VS2013 downloads as a .zip file

  This seems to be an issue with some of the 'smarts' in Windows 10. Rename the `netmfvs2013.zip` file to a `.vsix` file and run. It should automatically be opened by Visual Studio.

##### Build Error: <i>0x80131700 File = MMP.</i>
  On a fresh install, it is common to only have .Net 4.0 installed.
  However the .Net MicroFramework uses part of the .NET 2.0 CLR.

  This can be fixed by installed .NET 3.5 SP1 (http://www.microsoft.com/downloads/en/details.aspx?FamilyID=ab99342f-5d1a-413d-8319-81da479ab0d7&displaylang=en).

  More details here http://forums.netduino.com/index.php?/topic/913-build-error-0x80131700/.

### 3.5 Set up workspace

  Open Visual Studio Express 2013. You should be able to create a new project using a .Net Micro Framework Template.

  Under `File`, go `New Project` -> `Installed` -> `Templates` -> `Visual C#` -> `Micro Framework` and select `Netduino Application (Universal)`.

### 3.6 Deploy your first program

#### 3.6.1 Write your first Program

  Navigate to program.cs.

  Within main, paste the following code (or write your own :))

  ```
    OutputPort led = new OutputPort(Pins.ONBOARD_LED, false);

    while (true)
    {
        Thread.Sleep(1000);

        led.Write(!led.Read());
    }
  ```

#### 3.6.2 Configure the Project

  Double click `Properties` in the Solution Explorer.

  Under `Application`, ensure that the Target Framework is set to .NET Micro Framework 4.3

  Under `.NET Micro Framework`, ensure that Transport is set to USB and Device is set to your Netduino.

#### Known Issues:

  The first deploy has been known to fail. If the error message `DebugPort.GetDeviceProcess() called with no argument` appears, deploy to the Emulator, then switch back to USB and try to deploy again.

  The Emulator can be found under `.NET Micro Framework` -> `Transport` -> `Emulator`, in the Project Properties.

### 3.7 Take a snapshot!!

  You are now all set up ;). Please remember to take a snapshot if you are using one of Microsoft's free VMs, so that you restore to a working state after the 6 months is up :).

### Appendix: Updating the Netduino firmware

  My instructions above are using the latest tools / firmware (as of writing this).

  My Netduino had been flashed with the .NetMF 4.2.0 firmware. Here are a few tips on upgrading the firmware.

  This video shows the process I went through: https://www.youtube.com/watch?v=D3YndaRcFNk.

  This thread (http://forums.netduino.com/index.php?/topic/10479-netduino-plus-2-firmware-v431/) contains detailed instructions. However to access the download you need to create a blog account, which didn't work for me in Chrome.

  An alternate link to the firmware is http://static.netduino.com/downloads/netduinoupdate/NetduinoUpdate_4.3.2.3.zip, found on http://www.netduino.com/downloads/.

  I also installed the STDFU drivers + tools (http://www.netduino.com/downloads/dfusedemo_3.0.3.zip) but I'm unsure whether this helped.

  If you aren't able to get the Netduino to be recognised by the VM, try enabling all usb devices in the VirtualBox control panel.
